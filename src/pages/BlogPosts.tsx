import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditPost from './EditPost';
import { API_BASE_URL } from '../config/api';

const BlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = () => {
    axios.get(`${API_BASE_URL}/api/news`)
      .then((response) => {
        setBlogPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/news/${id}`);
        fetchBlogPosts(); // Refresh posts after delete
      } catch (error) {
        console.error('Error deleting blog post:', error);
        alert('Failed to delete blog post.');
      }
    }
  };

  const handleFeature = async (id) => {
  try {
    await axios.put(`${API_BASE_URL}/api/news/${id}`, { isFeatured: true });
    fetchBlogPosts();
  } catch (error) {
    console.error('Error featuring blog post:', error);
    alert('Failed to feature blog post.');
  }
};

const handleUnfeature = async (id) => {
  try {
    await axios.put(`${API_BASE_URL}/api/news/${id}`, { isFeatured: false });
    fetchBlogPosts();
  } catch (error) {
    console.error('Error unfeaturing blog post:', error);
    alert('Failed to unfeature blog post.');
  }
};

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowEdit(true);
  };

  if (loading) {
    return <div className="p-10 text-gray-500">Loading blog posts...</div>;
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Blog Posts</h2>
      {blogPosts.length === 0 ? (
        <p className="text-gray-500">No blog posts available.</p>
      ) : (
        <ul className="space-y-6">
          {blogPosts.map((post) => (
            <li key={post.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-2">
                {/* Use post.date instead of post.DATE */}
                <span className="text-sm text-gray-500">
                  {post.date}  •  {Array.isArray(post.categories) 
                    ? post.categories.join(', ') 
                    : (post.categories || post.category || 'No category')}
                </span>
                <span className="text-xs text-gray-400">By {post.author}</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-2">{post.summary}</p>
              <div className="text-xs text-gray-500 mt-2 space-y-1">
                <div>Tags: {post.tags}</div>
                {post.isExternalLink && (
                  <div className="text-blue-600">🔗 Links to: {post.pdfUrl}</div>
                )}
              </div>
              <div className="mt-4 flex gap-2">
  <button
    onClick={() => handleEdit(post)}
    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded transition"
  >
    Edit
  </button>
  <button
    onClick={() => handleDelete(post.id)}
    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
  >
    Delete
  </button>
  {post.isFeatured ? (
    <button
      onClick={() => handleUnfeature(post.id)}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
    >
      Unfeature
    </button>
  ) : (
    <button
      onClick={() => handleFeature(post.id)}
      className="px-4 py-2 bg-gray-300 hover:bg-blue-400 text-black rounded transition"
    >
      Feature
    </button>
  )}
</div>
            </li>
          ))}
        </ul>
      )}
      {/* EDIT POPUP RENDERING */}
      {showEdit && editingPost && (
        <EditPost
          post={editingPost}
          onClose={() => setShowEdit(false)}
          onUpdate={fetchBlogPosts}
        />
      )}
    </div>
  );
};

export default BlogPosts;