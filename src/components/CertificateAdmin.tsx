import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';

const CertificateAdmin = () => {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    full_document_url: '',
    certificate_type: 'OTHER',
    issue_date: '',
    expiry_date: '',
    issuing_authority: '',
    display_order: 0
  });

  // Fetch certificates
  const fetchCertificates = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/certificates');
      setCertificates(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch certificates:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (editingId) {
        // Update existing certificate
        await axios.put(`http://localhost:5001/api/certificates/${editingId}`, formData, config);
      } else {
        // Create new certificate
        await axios.post('http://localhost:5001/api/certificates', formData, config);
      }
      
      // Reset form and refresh data
      setFormData({
        title: '',
        description: '',
        image_url: '',
        full_document_url: '',
        certificate_type: 'OTHER',
        issue_date: '',
        expiry_date: '',
        issuing_authority: '',
        display_order: 0
      });
      setEditingId(null);
      setShowAddForm(false);
      fetchCertificates();
      
    } catch (error) {
      console.error('Failed to save certificate:', error);
      alert('Failed to save certificate. Please check your permissions.');
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      await axios.delete(`http://localhost:5001/api/certificates/${id}`, config);
      fetchCertificates();
    } catch (error) {
      console.error('Failed to delete certificate:', error);
      alert('Failed to delete certificate. Please check your permissions.');
    }
  };

  // Handle edit
  const handleEdit = (certificate: any) => {
    setFormData({
      title: certificate.title,
      description: certificate.description || '',
      image_url: certificate.image_url,
      full_document_url: certificate.full_document_url || '',
      certificate_type: certificate.certificate_type,
      issue_date: certificate.issue_date ? certificate.issue_date.split('T')[0] : '',
      expiry_date: certificate.expiry_date ? certificate.expiry_date.split('T')[0] : '',
      issuing_authority: certificate.issuing_authority || '',
      display_order: certificate.display_order
    });
    setEditingId(certificate.id);
    setShowAddForm(true);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading certificates...</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Certificate Management</h1>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingId(null);
            setFormData({
              title: '',
              description: '',
              image_url: '',
              full_document_url: '',
              certificate_type: 'OTHER',
              issue_date: '',
              expiry_date: '',
              issuing_authority: '',
              display_order: 0
            });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Certificate
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingId ? 'Edit Certificate' : 'Add New Certificate'}
            </h2>
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Type</label>
              <select
                value={formData.certificate_type}
                onChange={(e) => setFormData({...formData, certificate_type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ISO">ISO</option>
                <option value="HALAL">HALAL</option>
                <option value="QUALITY">QUALITY</option>
                <option value="SAFETY">SAFETY</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
              <input
                type="url"
                required
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                placeholder="/path/to/certificate-thumbnail.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Document URL</label>
              <input
                type="url"
                value={formData.full_document_url}
                onChange={(e) => setFormData({...formData, full_document_url: e.target.value})}
                placeholder="/path/to/full-certificate.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Authority</label>
              <input
                type="text"
                value={formData.issuing_authority}
                onChange={(e) => setFormData({...formData, issuing_authority: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
              <input
                type="date"
                value={formData.issue_date}
                onChange={(e) => setFormData({...formData, issue_date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="date"
                value={formData.expiry_date}
                onChange={(e) => setFormData({...formData, expiry_date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingId ? 'Update Certificate' : 'Add Certificate'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Certificates List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Current Certificates</h2>
        </div>
        
        {certificates.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No certificates found. Add your first certificate!
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {certificates.map((certificate) => (
              <div key={certificate.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={certificate.image_url}
                      alt={certificate.title}
                      className="w-16 h-16 object-contain bg-gray-100 rounded"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{certificate.title}</h3>
                      <p className="text-sm text-gray-500">{certificate.certificate_type}</p>
                      {certificate.issuing_authority && (
                        <p className="text-sm text-gray-400">by {certificate.issuing_authority}</p>
                      )}
                      {certificate.description && (
                        <p className="text-sm text-gray-600 mt-1 max-w-md">{certificate.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Order: {certificate.display_order}</span>
                    <button
                      onClick={() => handleEdit(certificate)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(certificate.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateAdmin;
