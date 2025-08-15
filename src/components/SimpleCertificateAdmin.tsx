import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { Plus, Edit, Trash2, Save, X, Eye } from 'lucide-react';

const SimpleCertificateAdmin = () => {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    logo_image: '',
    certificate_image: '',
    display_order: 0
  });

  // Fetch certificates
  const fetchCertificates = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/certificates`);
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
        await axios.put(`${API_BASE_URL}/api/certificates/${editingId}`, formData, config);
      } else {
        // Create new certificate
        await axios.post(`${API_BASE_URL}/api/certificates`, formData, config);
      }
      
      // Reset form and refresh data
      setFormData({
        title: '',
        logo_image: '',
        certificate_image: '',
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
      
      await axios.delete(`${API_BASE_URL}/api/certificates/${id}`, config);
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
      logo_image: certificate.logo_image,
      certificate_image: certificate.certificate_image,
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
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Certificate Management</h1>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingId(null);
            setFormData({
              title: '',
              logo_image: '',
              certificate_image: '',
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
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-lg">
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. ISO 9001:2015 Certified"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo Image URL *</label>
              <input
                type="text"
                required
                value={formData.logo_image}
                onChange={(e) => setFormData({...formData, logo_image: e.target.value})}
                placeholder="/socotec1.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Small logo image shown on the page</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Image URL *</label>
              <input
                type="text"
                required
                value={formData.certificate_image}
                onChange={(e) => setFormData({...formData, certificate_image: e.target.value})}
                placeholder="/iso-pic.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Full certificate image shown in popup</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
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
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Certificates List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
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
                    <div className="flex space-x-2">
                      <img
                        src={certificate.logo_image}
                        alt={`${certificate.title} logo`}
                        className="w-16 h-16 object-contain bg-gray-100 rounded border"
                      />
                      <img
                        src={certificate.certificate_image}
                        alt={`${certificate.title} certificate`}
                        className="w-16 h-16 object-contain bg-gray-100 rounded border"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{certificate.title}</h3>
                      <p className="text-sm text-gray-500">Order: {certificate.display_order}</p>
                      <div className="flex space-x-2 mt-2">
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Logo: {certificate.logo_image}</span>
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Cert: {certificate.certificate_image}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(certificate)}
                      className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(certificate.id)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100"
                      title="Delete"
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

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">How it works:</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• <strong>Logo Image:</strong> Small image displayed on the products page</li>
          <li>• <strong>Certificate Image:</strong> Full certificate shown when user clicks the logo</li>
          <li>• <strong>Display Order:</strong> Controls the order certificates appear (1, 2, 3...)</li>
          <li>• Images should be placed in your <code>/public</code> folder</li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleCertificateAdmin;
