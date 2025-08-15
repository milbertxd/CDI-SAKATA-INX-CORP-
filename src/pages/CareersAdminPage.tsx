import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Save, X, Briefcase, MapPin, Calendar, DollarSign } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

// Category choices for the new input
const CATEGORY_OPTIONS = [
  { value: '', label: 'Select Category' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Design', label: 'Design' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Others', label: 'Others' },
];

const initialForm = {
  title: '',
  department: '',
  location: '',
  type: '',
  salary: '',
  level: '',
  category: '', 
  description: '',
  responsibilities: '',
  requirements: '',
  qualifications: '',
  questions: '',
  date_posted: '',
};

const CareersAdminPage = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    axios.get(`${API_BASE_URL}/api/careers`)
      .then(res => {
        setJobPosts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert('Failed to fetch job posts');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🔄 Submitting career form...');
    console.log('📝 Form data:', formData);
    
    // Convert newlines to array
    const dataToSend = {
      ...formData,
      responsibilities: formData.responsibilities.split('\n').filter(Boolean),
      requirements: formData.requirements.split('\n').filter(Boolean),
      qualifications: formData.qualifications.split('\n').filter(Boolean),
      questions: formData.questions.split('\n').filter(Boolean),
      // Ensure category is always included
      category: formData.category,
    };

    console.log('📤 Sending career data:', dataToSend);

    try {
      if (editingId && editingId !== 'new') {
        console.log('🔄 Updating career ID:', editingId);
        await axios.put(`${API_BASE_URL}/api/careers/${editingId}`, dataToSend);
        alert('Job updated successfully!');
      } else {
        console.log('🔄 Creating new career...');
        const response = await axios.post(`${API_BASE_URL}/api/careers`, dataToSend);
        console.log('✅ Career created:', response.data);
        alert('Job post added successfully!');
      }
      
      // Reset form
      setFormData(initialForm);
      setEditingId(null);
      setShowForm(false);
      fetchJobs();
      
    } catch (error) {
      console.error('❌ Career submit error:', error);
      console.error('❌ Error response:', error.response?.data);
      console.error('❌ Error status:', error.response?.status);
      alert('Failed to save job post: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this job posting?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/careers/${id}`);
        fetchJobs();
      } catch {
        alert('Failed to delete job');
      }
    }
  };

  const handleEdit = (job) => {
    console.log('Editing job:', job); // Debug: see the job data
    console.log('Job category:', job.category); // Debug: see the category specifically
    setEditingId(job.id);
    setShowForm(true);
    setFormData({
      title: job.title || '',
      department: job.department || '',
      location: job.location || '',
      type: job.type || '',
      salary: job.salary || '',
      level: job.level || '',
      category: job.category || '', // ensure controlled select
      description: job.description || '',
      responsibilities: Array.isArray(job.responsibilities)
        ? job.responsibilities.join('\n')
        : (job.responsibilities || ''),
      requirements: Array.isArray(job.requirements)
        ? job.requirements.join('\n')
        : (job.requirements || ''),
      qualifications: Array.isArray(job.qualifications)
        ? job.qualifications.join('\n')
        : (job.qualifications || ''),
      questions: Array.isArray(job.questions)
        ? job.questions.join('\n')
        : (job.questions || ''),
      date_posted: job.date_posted
        ? job.date_posted.slice(0, 10)
        : '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(initialForm);
    setShowForm(false);
  };

  // Count jobs by category for dashboard
  const countByCategory = (category) =>
    jobPosts.filter(
      (job) =>
        job.category &&
        job.category.toLowerCase() === category.toLowerCase()
    ).length;

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Careers Management</h1>
            <p className="text-gray-600">Manage job postings and opportunities</p>
          </div>
        </div>
        <button
          onClick={() => {
            setEditingId('new');
            setFormData(initialForm);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add New Job
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {CATEGORY_OPTIONS.slice(1).map((category) => (
          <div key={category.value} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900">{countByCategory(category.value)}</h3>
            <p className="text-sm text-gray-600">{category.label}</p>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      {(showForm || editingId) && (
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingId === 'new' ? 'Add New Job' : 'Edit Job'}
            </h2>
            <button
              onClick={handleCancelEdit}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Enter job title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  required
                >
                  {CATEGORY_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Enter department"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Enter location"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Full-time, Part-time, Contract"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Enter salary range"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <input
                  type="text"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Junior, Mid, Senior"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Posted</label>
                <input
                  type="date"
                  name="date_posted"
                  value={formData.date_posted}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Enter job description"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="List responsibilities (one per line)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="List requirements (one per line)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications</label>
                <textarea
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="List qualifications (one per line)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interview Questions</label>
                <textarea
                  name="questions"
                  value={formData.questions}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="List interview questions (one per line)"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200"
              >
                <Save className="w-5 h-5" />
                {editingId === 'new' ? 'Create Job' : 'Update Job'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Jobs List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Active Job Postings</h2>
          <p className="text-gray-600 mt-1">Manage your current job listings</p>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="text-gray-600 mt-2">Loading jobs...</p>
          </div>
        ) : jobPosts.length === 0 ? (
          <div className="p-8 text-center">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No job postings yet. Create your first one!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {jobPosts.map((job) => (
              <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          {job.department && (
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {job.department}
                            </span>
                          )}
                          {job.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </span>
                          )}
                          {job.salary && (
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {job.salary}
                            </span>
                          )}
                          {job.date_posted && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(job.date_posted).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {job.category && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            {job.category}
                          </span>
                        )}
                        {job.type && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {job.type}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {job.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{job.description}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-6">
                    <button
                      onClick={() => handleEdit(job)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
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

export default CareersAdminPage;