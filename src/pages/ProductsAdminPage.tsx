import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Upload, Image as ImageIcon, Plus, Edit, Trash2, Save, X, Package, Eye, EyeOff } from 'lucide-react';
import { API_BASE_URL } from '@/config/api';

// Category choices for products - matching your Products.tsx
const CATEGORY_OPTIONS = [
  { value: '', label: 'Select Category' },
  { value: 'digital', label: 'Solvent-Based Inks' },
  { value: 'offset', label: 'Water-Based Inks' },
  { value: 'specialty', label: 'Metal Coating and Glass Enamel' },
  { value: 'sustainable', label: 'Eco-Friendly' },
];

const initialForm = {
  title: '',
  subtitle: '',
  category: '',
  description: '',
  features: '',
  applications: '',
  image_url: '',
  tds_file: '',
  sds_file: '',
  display_order: 0,
};

const ProductsAdminPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [tdsFile, setTdsFile] = useState(null);
  const [sdsFile, setSdsFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const imageInputRef = useRef(null);
  const tdsInputRef = useRef(null);
  const sdsInputRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    // Note: We need to get ALL products including inactive ones for admin
    axios.get(`${API_BASE_URL}/api/products`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
        alert('Failed to fetch products');
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  // Handle file upload
  const handleFileUpload = async (file, type = 'product') => {
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
      return response.data.filePath;
    } catch (error) {
      console.error('❌ Upload failed:', error);
      throw new Error(error.response?.data?.error || 'Failed to upload file');
    }
  };

  // Handle image file selection
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle TDS file selection
  const handleTdsFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file for TDS');
        return;
      }
      setTdsFile(file);
    }
  };

  // Handle SDS file selection
  const handleSdsFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file for SDS');
        return;
      }
      setSdsFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      let imageUrl = formData.image_url;
      let tdsFileUrl = formData.tds_file;
      let sdsFileUrl = formData.sds_file;

      // Upload image if file is selected
      if (imageFile) {
        console.log('🔄 Uploading image file...');
        imageUrl = await handleFileUpload(imageFile, 'product');
        console.log('✅ Image uploaded:', imageUrl);
      }

      // Upload TDS PDF if file is selected
      if (tdsFile) {
        console.log('🔄 Uploading TDS file...');
        tdsFileUrl = await handleFileUpload(tdsFile, 'pdf');
        console.log('✅ TDS file uploaded:', tdsFileUrl);
      }

      // Upload SDS PDF if file is selected
      if (sdsFile) {
        console.log('🔄 Uploading SDS file...');
        sdsFileUrl = await handleFileUpload(sdsFile, 'pdf');
        console.log('✅ SDS file uploaded:', sdsFileUrl);
      }

      // Convert newlines to array for features and applications
      const dataToSend = {
        ...formData,
        image_url: imageUrl,
        tds_file: tdsFileUrl,
        sds_file: sdsFileUrl,
        features: formData.features.split('\n').filter(Boolean),
        applications: formData.applications.split('\n').filter(Boolean),
        display_order: parseInt(String(formData.display_order)) || 0,
      };

      console.log('📤 Sending product data:', dataToSend);

      if (editingId && editingId !== 'new') {
        console.log('🔄 Updating product ID:', editingId);
        await axios.put(`${API_BASE_URL}/api/products/${editingId}`, dataToSend);
        alert('Product updated successfully!');
      } else {
        console.log('🔄 Creating new product...');
        await axios.post(`${API_BASE_URL}/api/products`, dataToSend);
        alert('Product created successfully!');
      }
      
      // Reset form
      setFormData(initialForm);
      setEditingId(null);
      setShowForm(false);
      setImageFile(null);
      setImagePreview('');
      setTdsFile(null);
      setSdsFile(null);
      if (imageInputRef.current) imageInputRef.current.value = '';
      if (tdsInputRef.current) tdsInputRef.current.value = '';
      if (sdsInputRef.current) sdsInputRef.current.value = '';
      fetchProducts();
      
    } catch (error) {
      console.error('❌ Submit error:', error);
      console.error('❌ Error response:', error.response?.data);
      alert('Failed to save product: ' + (error.response?.data?.error || error.message));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/products/${id}`);
        fetchProducts();
        alert('Product deleted successfully!');
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setShowForm(true);
    setImageFile(null);
    setImagePreview('');
    setTdsFile(null);
    setSdsFile(null);
    setFormData({
      title: product.title || '',
      subtitle: product.subtitle || '',
      category: product.category || '',
      description: product.description || '',
      features: Array.isArray(product.features) 
        ? product.features.join('\n') 
        : (product.features || ''),
      applications: Array.isArray(product.applications) 
        ? product.applications.join('\n') 
        : (product.applications || ''),
      image_url: product.image_url || '',
      tds_file: product.tds_file || '',
      sds_file: product.sds_file || '',
      display_order: product.display_order || 0,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(initialForm);
    setShowForm(false);
    setImageFile(null);
    setImagePreview('');
    setTdsFile(null);
    setSdsFile(null);
  };

  // Count products by category for dashboard
  const countByCategory = (category) =>
    products.filter(product => 
      product.category && 
      product.category.toLowerCase() === category.toLowerCase() &&
      product.is_active
    ).length;

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
            <p className="text-gray-600">Manage your product catalog and information</p>
          </div>
        </div>
        <button
          onClick={() => {
            setEditingId('new');
            setFormData(initialForm);
            setShowForm(true);
            setImageFile(null);
            setImagePreview('');
            setTdsFile(null);
            setSdsFile(null);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-200 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900">{products.filter(p => p.is_active).length}</h3>
          <p className="text-sm text-gray-600">Active Products</p>
        </div>
        {CATEGORY_OPTIONS.slice(1).map((category) => (
          <div key={category.value} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900">{countByCategory(category.value)}</h3>
            <p className="text-sm text-gray-600">{category.label}</p>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingId === 'new' ? 'Add New Product' : 'Edit Product'}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData(initialForm);
                setImageFile(null);
                setImagePreview('');
                setTdsFile(null);
                setSdsFile(null);
              }}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter product title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  required
                >
                  {CATEGORY_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter product subtitle"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                <input
                  type="number"
                  name="display_order"
                  value={formData.display_order}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Display order (0 = first)"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="Enter product description"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
              <textarea
                name="features"
                value={formData.features}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="List features (one per line)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Applications</label>
              <textarea
                name="applications"
                value={formData.applications}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="List applications (one per line)"
              />
            </div>
            
            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
              
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img src={imagePreview} alt="Preview" className="max-h-32 mx-auto rounded-lg" />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview('');
                      }}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        className="text-purple-600 hover:text-purple-800 font-medium"
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
              
              {/* Manual URL Input */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Or enter image URL manually</label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            
            {/* TDS File Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">TDS File (Technical Data Sheet)</label>
              
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                {tdsFile ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <Upload className="w-6 h-6 text-green-600" />
                      <span className="text-sm font-medium text-green-600">{tdsFile.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setTdsFile(null);
                        if (tdsInputRef.current) tdsInputRef.current.value = '';
                      }}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove TDS File
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => tdsInputRef.current?.click()}
                        className="text-green-600 hover:text-green-800 font-medium"
                      >
                        Upload TDS PDF
                      </button>
                      <p className="text-gray-500 text-sm">PDF files only</p>
                    </div>
                  </div>
                )}
                
                <input
                  ref={tdsInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleTdsFileChange}
                  className="hidden"
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Or enter TDS file URL manually</label>
                <input
                  type="url"
                  name="tds_file"
                  value={formData.tds_file}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="https://example.com/tds-file.pdf"
                />
              </div>
            </div>
            
            {/* SDS File Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SDS File (Safety Data Sheet)</label>
              
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                {sdsFile ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <Upload className="w-6 h-6 text-orange-600" />
                      <span className="text-sm font-medium text-orange-600">{sdsFile.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSdsFile(null);
                        if (sdsInputRef.current) sdsInputRef.current.value = '';
                      }}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove SDS File
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => sdsInputRef.current?.click()}
                        className="text-orange-600 hover:text-orange-800 font-medium"
                      >
                        Upload SDS PDF
                      </button>
                      <p className="text-gray-500 text-sm">PDF files only</p>
                    </div>
                  </div>
                )}
                
                <input
                  ref={sdsInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleSdsFileChange}
                  className="hidden"
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Or enter SDS file URL manually</label>
                <input
                  type="url"
                  name="sds_file"
                  value={formData.sds_file}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="https://example.com/sds-file.pdf"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData(initialForm);
                  setImageFile(null);
                  setImagePreview('');
                  setTdsFile(null);
                  setSdsFile(null);
                }}
                className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {uploading ? 'Uploading...' : editingId === 'new' ? 'Create Product' : 'Update Product'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Product Catalog</h2>
          <p className="text-gray-600 mt-1">Manage your product listings</p>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="text-gray-600 mt-2">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No products yet. Create your first one!</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:border-purple-200 transition-colors group">
                  {/* Product Image */}
                  <div className="relative h-48 bg-gradient-to-br from-purple-50 to-blue-50">
                    <img 
                      src={(() => {
                        const imageUrl = product.image_url || product.image || "/pic.jpg";
                        return imageUrl.startsWith('/uploads/') 
                          ? `${API_BASE_URL}${imageUrl}` 
                          : imageUrl;
                      })()}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/pic.jpg";
                      }}
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      {product.category && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          {CATEGORY_OPTIONS.find(opt => opt.value === product.category)?.label || product.category}
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        product.is_active 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                      {product.title}
                    </h3>
                    {product.subtitle && (
                      <p className="text-sm text-gray-600 mb-2">{product.subtitle}</p>
                    )}
                    {product.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Order: {product.display_order || 0}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsAdminPage;
