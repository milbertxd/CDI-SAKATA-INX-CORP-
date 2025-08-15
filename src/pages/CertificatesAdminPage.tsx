import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Trash2, Edit, Plus, Save, X, Upload, Image as ImageIcon, Award, Eye, FileImage } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

interface Certificate {
  id: number;
  title: string;
  logo_image: string;
  certificate_image: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const CertificatesAdminPage = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    logo_image: '',
    certificate_image: '',
    display_order: 0
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [certificatePreview, setCertificatePreview] = useState<string>('');
  const logoInputRef = useRef<HTMLInputElement>(null);
  const certificateInputRef = useRef<HTMLInputElement>(null);

  // Fetch certificates
  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/certificates`);
      setCertificates(response.data);
      setError('');
    } catch (err: any) {
      setError('Failed to fetch certificates: ' + (err.response?.data?.error || err.message));
      console.error('Error fetching certificates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  // Handle file uploads
  const handleFileUpload = async (file: File, type: 'logo' | 'certificate'): Promise<string> => {
    console.log(`🔄 Uploading ${type} image:`, file.name, file.size, 'bytes', file.type);
    
    const formData = new FormData();
    // Use 'image' for image uploads in certificates
    formData.append('image', file);
    formData.append('type', type);

    console.log('📤 FormData created, sending to server...');
    console.log('📤 FormData entries:');
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      console.log('🌐 Making request to: http://localhost:5002/api/upload');

      const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 second timeout
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`📈 Upload progress: ${percentCompleted}%`);
          }
        },
      });
      
      console.log('✅ Upload successful:', response.data);
      return response.data.filePath;
    } catch (error: any) {
      console.error('❌ Upload failed:', error);
      
      if (error.code === 'ECONNREFUSED') {
        console.error('🔌 Connection refused - server might not be running');
        throw new Error('Cannot connect to server. Please make sure the backend is running on port 5002.');
      }
      
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        throw new Error(error.response?.data?.error || `Server error: ${error.response.status}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('No response from server. Please check your connection.');
      } else {
        console.error('Request setup error:', error.message);
        throw new Error(`Request error: ${error.message}`);
      }
    }
  };

  // Handle logo file selection
  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle certificate file selection
  const handleCertificateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCertificateFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCertificatePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear form data
  const clearForm = () => {
    setFormData({ title: '', logo_image: '', certificate_image: '', display_order: 0 });
    setLogoFile(null);
    setCertificateFile(null);
    setLogoPreview('');
    setCertificatePreview('');
    if (logoInputRef.current) logoInputRef.current.value = '';
    if (certificateInputRef.current) certificateInputRef.current.value = '';
  };

  // Add new certificate
  const handleAdd = async () => {
    try {
      if (!formData.title) {
        setError('Please fill in the title');
        return;
      }

      if (!logoFile && !formData.logo_image) {
        setError('Please upload a logo image or provide an image path');
        return;
      }

      if (!certificateFile && !formData.certificate_image) {
        setError('Please upload a certificate image or provide an image path');
        return;
      }

      let logoPath = formData.logo_image;
      let certificatePath = formData.certificate_image;

      // Upload files if selected
      if (logoFile) {
        logoPath = await handleFileUpload(logoFile, 'logo');
      }

      if (certificateFile) {
        certificatePath = await handleFileUpload(certificateFile, 'certificate');
      }

      await axios.post(`${API_BASE_URL}/api/certificates`, {
        title: formData.title,
        logo_image: logoPath,
        certificate_image: certificatePath,
        display_order: formData.display_order
      });

      await fetchCertificates();
      setShowAddForm(false);
      clearForm();
      setError('');
    } catch (err: any) {
      setError('Failed to add certificate: ' + (err.response?.data?.error || err.message));
    }
  };

  // Update certificate
  const handleUpdate = async (id: number) => {
    try {
      const certificate = certificates.find(c => c.id === id);
      if (!certificate) return;

      await axios.put(`${API_BASE_URL}/api/certificates/${id}`, {
        title: certificate.title,
        logo_image: certificate.logo_image,
        certificate_image: certificate.certificate_image,
        display_order: certificate.display_order
      });
      
      setEditingId(null);
      await fetchCertificates();
      setError('');
    } catch (err: any) {
      setError('Failed to update certificate: ' + (err.response?.data?.error || err.message));
    }
  };

  // Delete certificate
  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/certificates/${id}`);
      await fetchCertificates();
      setError('');
    } catch (err: any) {
      setError('Failed to delete certificate: ' + (err.response?.data?.error || err.message));
    }
  };

  // Update local state for editing
  const updateCertificate = (id: number, field: string, value: string | number) => {
    setCertificates(prev => prev.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mb-4"></div>
            <p className="text-xl text-gray-600">Loading certificates...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Certificates Management</h1>
            <p className="text-gray-600">Manage quality certifications and credentials</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors duration-200 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Certificate
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{certificates.length}</h3>
              <p className="text-sm text-gray-600">Total Certificates</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{certificates.filter(c => c.is_active).length}</h3>
              <p className="text-sm text-gray-600">Active Certificates</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileImage className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{certificates.filter(c => c.logo_image && c.certificate_image).length}</h3>
              <p className="text-sm text-gray-600">Complete Profiles</p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
          <X className="w-5 h-5 text-red-500" />
          {error}
        </div>
      )}

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-orange-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Add New Certificate</h2>
              </div>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  clearForm();
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  placeholder="e.g., ISO 9001:2015 Quality Management"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo Image *
                  </label>
                  <div className="space-y-3">
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-gray-200 rounded-xl px-3 py-8 text-center hover:border-orange-400 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                    >
                      {logoPreview ? (
                        <div className="space-y-2">
                          <img src={logoPreview} alt="Logo preview" className="h-16 w-16 object-contain mx-auto rounded" />
                          <p className="text-sm text-gray-600">Click to change logo</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                          <p className="text-sm text-gray-600">Upload logo image</p>
                          <p className="text-xs text-gray-500">PNG, JPG, SVG up to 10MB</p>
                        </div>
                      )}
                    </button>
                    
                    <div className="relative">
                      <span className="text-xs text-gray-500 mb-1 block">Or enter image path:</span>
                      <input
                        type="text"
                        value={formData.logo_image}
                        onChange={(e) => setFormData(prev => ({ ...prev, logo_image: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                        placeholder="/logo.png"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Image *
                  </label>
                  <div className="space-y-3">
                    <input
                      ref={certificateInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCertificateFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => certificateInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-gray-200 rounded-xl px-3 py-8 text-center hover:border-orange-400 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                    >
                      {certificatePreview ? (
                        <div className="space-y-2">
                          <img src={certificatePreview} alt="Certificate preview" className="h-16 w-24 object-contain mx-auto rounded" />
                          <p className="text-sm text-gray-600">Click to change certificate</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <ImageIcon className="h-8 w-8 text-gray-400 mx-auto" />
                          <p className="text-sm text-gray-600">Upload certificate image</p>
                          <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                        </div>
                      )}
                    </button>
                    
                    <div className="relative">
                      <span className="text-xs text-gray-500 mb-1 block">Or enter image path:</span>
                      <input
                        type="text"
                        value={formData.certificate_image}
                        onChange={(e) => setFormData(prev => ({ ...prev, certificate_image: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                        placeholder="/certificate.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  min="0"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  clearForm();
                }}
                className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors duration-200"
              >
                <Save className="w-5 h-5" />
                Add Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificates Grid */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Active Certificates</h2>
          <p className="text-gray-600 mt-1">Manage your quality certifications and credentials</p>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <p className="text-gray-600 mt-2">Loading certificates...</p>
          </div>
        ) : certificates.length === 0 ? (
          <div className="p-8 text-center">
            <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No certificates found</p>
            <p className="text-gray-400 text-sm mt-1">Click "Add Certificate" to create your first certificate</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {certificates.map((certificate) => (
              <div key={certificate.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={certificate.logo_image.startsWith('/uploads/') 
                        ? `http://localhost:5002${certificate.logo_image}` 
                        : certificate.logo_image}
                      alt={certificate.title}
                      className="h-12 w-12 object-contain rounded-lg border bg-white"
                      onError={(e) => {
                        console.log(`❌ Failed to load image: ${certificate.logo_image}`);
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    <div className="flex-1">
                      {editingId === certificate.id ? (
                        <input
                          type="text"
                          value={certificate.title}
                          onChange={(e) => updateCertificate(certificate.id, 'title', e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      ) : (
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{certificate.title}</h3>
                      )}
                    </div>
                  </div>
                  
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    certificate.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {certificate.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {editingId === certificate.id ? (
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Logo Image Path</label>
                      <input
                        type="text"
                        value={certificate.logo_image}
                        onChange={(e) => updateCertificate(certificate.id, 'logo_image', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Certificate Image Path</label>
                      <input
                        type="text"
                        value={certificate.certificate_image}
                        onChange={(e) => updateCertificate(certificate.id, 'certificate_image', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Display Order</label>
                      <input
                        type="number"
                        value={certificate.display_order}
                        onChange={(e) => updateCertificate(certificate.id, 'display_order', parseInt(e.target.value) || 0)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        min="0"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-gray-500 mb-4 space-y-1">
                    <p><span className="font-medium">Order:</span> {certificate.display_order}</p>
                    <p><span className="font-medium">Created:</span> {new Date(certificate.created_at).toLocaleDateString()}</p>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {editingId === certificate.id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(certificate.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Save changes"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            fetchCertificates();
                          }}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Cancel editing"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditingId(certificate.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit certificate"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(certificate.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete certificate"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                  
                  <button
                    onClick={() => window.open(
                      certificate.certificate_image.startsWith('/uploads/') 
                        ? `http://localhost:5002${certificate.certificate_image}` 
                        : certificate.certificate_image, 
                      '_blank'
                    )}
                    className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    title="View certificate"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Guidelines */}
      <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <FileImage className="w-5 h-5" />
          Image Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">File Upload Options:</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• Click upload areas to select files from computer</li>
              <li>• Drag and drop supported in modern browsers</li>
              <li>• Supported formats: JPG, PNG, SVG, WebP</li>
              <li>• Maximum file size: 10MB per image</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Manual Path Options:</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• Enter paths relative to public folder</li>
              <li>• Logo images: 200x150px recommended</li>
              <li>• Certificate images: High resolution preferred</li>
              <li>• Use /folder/image.png format</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatesAdminPage;
