import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const CATEGORY_OPTIONS = [
  { value: 'Innovation', label: 'Innovation' },
  { value: 'Awards', label: 'Awards' },
  { value: 'Expansion', label: 'Expansion' },
  { value: 'Sustainability', label: 'Sustainability' },
  { value: 'Events', label: 'Events' },
  { value: 'Others', label: 'Others' },
];

const AddNewPost: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '', // Rich content for detailed article
    date: '',
    categories: [],
    author: '',
    image: '',
    tags: '',
    pdfUrl: '',
    isExternalLink: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox' && name === 'isExternalLink') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCategoryChange = (categoryValue: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryValue)
        ? prev.categories.filter(cat => cat !== categoryValue)
        : [...prev.categories, categoryValue]
    }));
  };

  // Handle file upload
  const handleFileUpload = async (file: File): Promise<string> => {
    console.log(`🔄 Uploading news image:`, file.name, file.size, 'bytes');
    
    const formData = new FormData();
    // Use 'file' for all uploads to match backend expectation
    formData.append('file', file);
    formData.append('type', 'news');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('✅ Upload successful:', response.data);
      return response.data.filePath;
    } catch (error: any) {
      console.error('❌ Upload failed:', error);
      throw new Error(error.response?.data?.error || 'Failed to upload image');
    }
  };

  // Handle image file selection
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    console.log('🔥 Frontend: Submitting new post with data:', formData);
    console.log('🔥 Frontend: API URL:', `${API_BASE_URL}/api/news`);

    try {
      let imagePath = formData.image;

      // Upload image if file is selected
      if (imageFile) {
        imagePath = await handleFileUpload(imageFile);
      }

      const submitData = {
        ...formData,
        image: imagePath
      };

      const response = await axios.post(`${API_BASE_URL}/api/news`, submitData);
      console.log('✅ Frontend: News posted successfully!', response.data);
      alert('News post added successfully!');
      setFormData({
        title: '',
        summary: '',
        content: '',
        date: '',
        categories: [],
        author: '',
        image: '',
        tags: '',
        pdfUrl: '',
        isExternalLink: false,
      });
      setImageFile(null);
      setImagePreview('');
      if (imageInputRef.current) imageInputRef.current.value = '';
    } catch (error) {
      console.error('❌ Frontend: Failed to post news:', error);
      
      if (error.response) {
        console.error('❌ Frontend: Error status:', error.response.status);
        console.error('❌ Frontend: Error data:', error.response.data);
        console.error('❌ Frontend: Error headers:', error.response.headers);
        alert(`Failed to add news post: ${error.response.data?.error || error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        console.error('❌ Frontend: No response received:', error.request);
        alert('Failed to add news post: No response from server. Is the server running?');
      } else {
        console.error('❌ Frontend: Error setting up request:', error.message);
        alert(`Failed to add news post: ${error.message}`);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Create New Article</h2>
      
      <input 
        type="text" 
        name="title" 
        placeholder="Article Title" 
        value={formData.title} 
        onChange={handleChange} 
        className="w-full p-3 border border-gray-300 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500" 
        required 
      />
      
      <textarea 
        name="summary" 
        placeholder="Article Summary (shown on news cards - keep it concise)" 
        value={formData.summary} 
        onChange={handleChange} 
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
        rows={3} 
        required 
      />

      {/* Rich Content Editor */}
      <div className="space-y-3">
        <label className="block text-lg font-semibold text-gray-700">
          📝 Article Content (Full Article - Rich Text)
        </label>
        <textarea 
          name="content" 
          placeholder="Write your full article content here...

You can format it like this:
# Main Heading
## Subheading  
**Bold Text**
*Italic Text*

- Bullet point 1
- Bullet point 2

Links: [Link Text](https://example.com)

Images in content:
![Image Description](https://example.com/image.jpg)
or
[Image: Caption text](https://example.com/image.jpg)

Write multiple paragraphs with detailed information about your news article. This content will appear on the detailed news page with rich formatting."
          value={formData.content} 
          onChange={handleChange} 
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm" 
          rows={15}
          style={{ minHeight: '400px', lineHeight: '1.6' }}
        />
        <div className="text-xs text-gray-500 bg-blue-50 p-4 rounded-md">
          <strong>💡 Formatting Tips for Rich Content:</strong>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div># Large Heading</div>
            <div>## Medium Heading</div>
            <div>**Bold Text**</div>
            <div>*Italic Text*</div>
            <div>- Bullet Points</div>
            <div>1. Numbered Lists</div>
          </div>
          <div className="mt-3 p-2 bg-green-50 rounded">
            <strong>🖼️ Images in Content:</strong>
            <div className="text-xs mt-1">
              <div>![Description](image-url)</div>
              <div>[Image: Caption](image-url)</div>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-600">
            <strong>Pro Tips:</strong> Use headings for sections, bold for emphasis, bullet points for lists, images for visual content, and links for references. This content will appear beautifully formatted on the detailed news page.
          </p>
        </div>
      </div>
      <input
        type="date"
        name="date"
        placeholder="Publication Date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      
      {/* Categories Section */}
      <div className="space-y-3">
        <label className="block text-lg font-semibold text-gray-700">
          📂 Categories (Select multiple)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {CATEGORY_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.categories.includes(option.value)}
                onChange={() => handleCategoryChange(option.value)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <input 
        type="text" 
        name="author" 
        placeholder="Author Name" 
        value={formData.author} 
        onChange={handleChange} 
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
        required 
      />
      
      {/* Link Type Selection */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-md">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="isExternalLink"
            checked={formData.isExternalLink}
            onChange={handleChange}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-gray-700 font-medium">🔗 Link to PDF instead of article page</span>
        </label>
        
        {formData.isExternalLink && (
          <input
            type="url"
            name="pdfUrl"
            placeholder="PDF URL (e.g., https://example.com/file.pdf)"
            value={formData.pdfUrl}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>
      
      {/* Image Upload Section */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-700">
          🖼️ Featured Image
        </label>
        
        {/* File Upload Option */}
        <div>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="w-full border-2 border-dashed border-blue-300 rounded-lg px-6 py-12 text-center hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-blue-50 hover:bg-blue-100"
          >
            {imagePreview ? (
              <div className="space-y-3">
                <img src={imagePreview} alt="Article preview" className="h-32 w-48 object-cover mx-auto rounded-lg shadow-md" />
                <p className="text-blue-600 font-medium">Click to change image</p>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="h-12 w-12 text-blue-400 mx-auto" />
                <div>
                  <p className="text-blue-600 font-medium text-lg">Click to upload featured image</p>
                  <p className="text-gray-500 text-sm">PNG, JPG, SVG up to 10MB</p>
                </div>
              </div>
            )}
          </button>
        </div>
        
        {/* Manual URL Option */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-600 mb-2">Or enter image URL manually:</label>
          <input 
            type="text" 
            name="image" 
            placeholder="Image URL (https://example.com/image.jpg)" 
            value={formData.image} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
      </div>
      
      <input 
        type="text" 
        name="tags" 
        placeholder="Tags (comma separated, e.g., Innovation, Technology, Business)" 
        value={formData.tags} 
        onChange={handleChange} 
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />
      
      <button 
        type="submit" 
        disabled={uploading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:transform-none"
      >
        {uploading ? '✨ Publishing Article...' : '🚀 Publish Article'}
      </button>
    </form>
  );
};

export default AddNewPost;