import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { Plus, Edit2, Trash2, Upload, X, Save } from 'lucide-react';

interface GalleryImage {
  id: number;
  title: string;
  description: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const GalleryAdminPage = () => {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    display_order: 0,
    is_active: true
  });

  // Fetch gallery images
  const fetchGallery = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/gallery`);
      setGallery(response.data);
      setError('');
    } catch (err: any) {
      setError('Failed to fetch gallery: ' + (err.response?.data?.error || err.message));
      console.error('Error fetching gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Handle file upload - Copied from working ProductsAdminPage
  const handleFileUpload = async (file: File, type = 'gallery') => {
    console.log(`🔄 Uploading ${type} file:`, file.name, file.size, 'bytes');
    
    const formData = new FormData();
    // Use 'file' for all uploads to match backend expectation
    formData.append('file', file);
    formData.append('type', type);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('✅ Upload successful:', response.data);
      return response.data.filePath;  // This is what works in your other pages
    } catch (error) {
      console.error('❌ Upload failed:', error);
      throw new Error(error.response?.data?.error || 'Failed to upload file');
    }
  };

  // Handle image file change
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let imageUrl = formData.image_url;
      
      // Upload image if file is selected
      if (imageFile) {
        console.log('🔄 Uploading file:', imageFile.name);
        imageUrl = await handleFileUpload(imageFile, 'gallery');  // Add the type parameter
        console.log('✅ Upload successful, URL:', imageUrl);
      }
      
      // Check if we have an image URL (either uploaded or manually entered)
      if (!imageUrl || imageUrl.trim() === '') {
        alert('Please provide an image by uploading a file or entering an image URL');
        return;
      }

      const submissionData = {
        title: formData.title,
        description: formData.description,
        image_url: imageUrl, // Use the imageUrl variable, not formData.image_url
        display_order: formData.display_order,
        is_active: formData.is_active
      };

      console.log('📤 Submitting data:', submissionData);

      if (editingId) {
        // Update existing
        await axios.put(`${API_BASE_URL}/api/gallery/${editingId}`, submissionData);
        alert('Gallery image updated successfully!');
        setEditingId(null);
      } else {
        // Create new
        await axios.post(`${API_BASE_URL}/api/gallery`, submissionData);
        alert('Gallery image added successfully!');
        setShowAddForm(false);
      }
      
      // Reset form
      resetForm();
      fetchGallery();
    } catch (err: any) {
      console.error('❌ Submission error:', err);
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  // Handle edit - Fixed version
  const handleEdit = (item: GalleryImage) => {
    setFormData({
      title: item.title,
      description: item.description,
      image_url: item.image_url,
      display_order: item.display_order,
      is_active: item.is_active
    });
    setEditingId(item.id);
    setShowAddForm(false);
    
    // Fix: Create proper URL for preview
    const imageUrl = item.image_url;
    if (imageUrl.startsWith('/uploads/')) {
      // For uploaded files, create full URL
      setImagePreview(`${API_BASE_URL}${imageUrl}`);
    } else {
      // For external URLs or existing public images
      setImagePreview(imageUrl);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this gallery image?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/gallery/${id}`);
        alert('Gallery image deleted successfully!');
        fetchGallery();
      } catch (err: any) {
        alert('Error deleting gallery image: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      display_order: 0,
      is_active: true
    });
    setImageFile(null);
    setImagePreview('');
    setEditingId(null);
    setShowAddForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-600 mt-2">Manage homepage gallery images and descriptions</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Gallery Image
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
          {error}
        </div>
      )}

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingId ? 'Edit Gallery Image' : 'Add New Gallery Image'}
            </h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="e.g., Premium Solvent Solutions"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="e.g., High-quality solvent-based inks for versatile printing applications"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img src={imagePreview} alt="Preview" className="mx-auto h-40 w-auto object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview('');
                        if (imageInputRef.current) imageInputRef.current.value = '';
                      }}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Click to upload
                      </button>
                      <p className="text-gray-500 text-sm">or drag and drop</p>
                      <p className="text-gray-400 text-xs">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                )}
                
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                <input
                  type="number"
                  name="display_order"
                  value={formData.display_order}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  min="0"
                />
              </div>
              
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                {editingId ? 'Update' : 'Add'} Gallery Image
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading gallery...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img 
                  src={item.image_url.startsWith('/uploads/') ? `${API_BASE_URL}${item.image_url}` : item.image_url} 
                  alt={item.title} 
                  className="w-full h-48 object-cover" 
                  onError={(e) => {
                    console.error('Image failed to load:', item.image_url);
                    e.currentTarget.src = '/placeholder-image.jpg'; // Fallback image
                  }}
                />
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                  item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.is_active ? 'Active' : 'Inactive'}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                <div className="text-xs text-gray-500 mb-3">Order: {item.display_order}</div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryAdminPage;