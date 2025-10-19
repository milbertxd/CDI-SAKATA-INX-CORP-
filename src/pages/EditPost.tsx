import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/config/api';

const CATEGORY_OPTIONS = [
  { value: 'Innovation', label: 'Innovation' },
  { value: 'Awards', label: 'Awards' },
  { value: 'Expansion', label: 'Expansion' },
  { value: 'Sustainability', label: 'Sustainability' },
  { value: 'Events', label: 'Events' },
  { value: 'Others', label: 'Others' },
];

const EditPost = ({ post, onClose, onUpdate }) => {
  // Prefill all fields from the post, including date
  const [formData, setFormData] = useState({
    title: post.title || '',
    summary: post.summary || '',
    content: post.content || '', // Rich content
    date: post.date || '',
    categories: Array.isArray(post.categories) ? post.categories : 
                (typeof post.categories === 'string' ? post.categories.split(',').map(c => c.trim()) : 
                 post.category ? [post.category] : []),
    author: post.author || '',
    image: post.image || '',
    tags: post.tags || '',
    pdfUrl: post.pdfUrl || '',
    isExternalLink: post.isExternalLink || false,
  });

  // Unified change handler
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox' && name === 'isExternalLink') {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCategoryChange = (categoryValue) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryValue)
        ? prev.categories.filter(cat => cat !== categoryValue)
        : [...prev.categories, categoryValue]
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🔥 Frontend: Submitting edit form with data:', formData);
    console.log('🔥 Frontend: Post ID:', post.id);
    console.log('🔥 Frontend: API URL:', `${API_ENDPOINTS.NEWS}/${post.id}`);
    
    try {
      const response = await axios.put(`${API_ENDPOINTS.NEWS}/${post.id}`, formData);
      console.log('✅ Frontend: Update successful!', response.data);
      alert('Post updated successfully!');
      onUpdate(); // Refresh posts
      onClose();  // Close modal
    } catch (error) {
      console.error('❌ Frontend: Failed to update post:', error);
      
      if (error.response) {
        console.error('❌ Frontend: Error status:', error.response.status);
        console.error('❌ Frontend: Error data:', error.response.data);
        console.error('❌ Frontend: Error headers:', error.response.headers);
        alert(`Failed to update post: ${error.response.data?.error || error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        console.error('❌ Frontend: No response received:', error.request);
        alert('Failed to update post: No response from server. Is the server running?');
      } else {
        console.error('❌ Frontend: Error setting up request:', error.message);
        alert(`Failed to update post: ${error.message}`);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 relative flex flex-col"
        style={{
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-xl">
          <h2 className="text-2xl font-bold text-white">✏️ Edit Article</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold transition w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20"
            aria-label="Close edit modal"
          >
            ×
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Article Summary (shown on news cards)" 
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

Write multiple paragraphs with detailed information about your news article."
                value={formData.content} 
                onChange={handleChange} 
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm" 
                rows={12}
                style={{ minHeight: '300px', lineHeight: '1.6' }}
              />
              <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-md">
                <strong>💡 Formatting Tips:</strong>
                <div className="grid grid-cols-2 gap-2 mt-2">
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
              </div>
            </div>
            {/* DATE FIELD: use type="date" and correct value */}
            <input
              type="date"
              name="date"
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
            
            <input 
              type="text" 
              name="image" 
              placeholder="Featured Image URL" 
              value={formData.image} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
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
            
            <input 
              type="text" 
              name="tags" 
              placeholder="Tags (comma separated, e.g., Innovation, Technology)" 
              value={formData.tags} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button 
                type="button" 
                onClick={onClose} 
                className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
              >
                💾 Update Article
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;