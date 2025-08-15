import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BlogPosts from './BlogPosts';
import AddNewPost from './AddNewPost';
import CareersAdminPage from './CareersAdminPage';
import ProductsAdminPage from './ProductsAdminPage';
import CertificatesAdminPage from './CertificatesAdminPage';
import ChangePassword from '../components/ChangePassword';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Package, 
  Award, 
  Lock, 
  LogOut,
  BarChart3,
  Users,
  Eye,
  MessageSquare,
  Image
} from 'lucide-react';
import GalleryAdminPage from './GalleryAdminPage';

const AdminDashboard = () => {
  const [selected, setSelected] = useState('dashboard');
  const [newsSubSection, setNewsSubSection] = useState('manage'); // 'manage' or 'add'
  const [dashboardStats, setDashboardStats] = useState({
    news: 0,
    products: 0,
    certificates: 0,
    careers: 0,
    loading: true
  });
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch dashboard statistics
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        console.log('🔄 Fetching dashboard statistics...');
        
        const [newsRes, productsRes, certificatesRes, careersRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/news`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE_URL}/api/products`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE_URL}/api/certificates`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE_URL}/api/careers`).catch(() => ({ data: [] }))
        ]);

        console.log('📊 Dashboard data fetched:', {
          news: newsRes.data.length,
          products: productsRes.data.length,
          certificates: certificatesRes.data.length,
          careers: careersRes.data.length
        });

        setDashboardStats({
          news: newsRes.data.length,
          products: productsRes.data.length,
          certificates: certificatesRes.data.length,
          careers: careersRes.data.length,
          loading: false
        });
      } catch (error) {
        console.error('❌ Error fetching dashboard stats:', error);
        setDashboardStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchDashboardStats();
  }, []);

  // Refresh stats when user switches back to dashboard
  useEffect(() => {
    if (selected === 'dashboard') {
      setDashboardStats(prev => ({ ...prev, loading: true }));
      const fetchStats = async () => {
        try {
          const [newsRes, productsRes, certificatesRes, careersRes] = await Promise.all([
            axios.get(`${API_BASE_URL}/api/news`).catch(() => ({ data: [] })),
            axios.get(`${API_BASE_URL}/api/products`).catch(() => ({ data: [] })),
            axios.get(`${API_BASE_URL}/api/certificates`).catch(() => ({ data: [] })),
            axios.get(`${API_BASE_URL}/api/careers`).catch(() => ({ data: [] }))
          ]);

          setDashboardStats({
            news: newsRes.data.length,
            products: productsRes.data.length,
            certificates: certificatesRes.data.length,
            careers: careersRes.data.length,
            loading: false
          });
        } catch (error) {
          console.error('Error refreshing dashboard stats:', error);
          setDashboardStats(prev => ({ ...prev, loading: false }));
        }
      };
      fetchStats();
    }
  }, [selected]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'news', label: 'News & Blog', icon: FileText },
    { id: 'careers', label: 'Careers', icon: Briefcase },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'password', label: 'Security', icon: Lock },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 shadow-sm flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src="/logo.png" 
              alt="CDI Sakata INX Logo" 
              className="h-14 w-auto object-contain"
              onError={(e) => {
                console.log('Failed to load /logo.png, trying /Container.png');
                (e.target as HTMLImageElement).src = '/Container.png';
              }}
            />
            {/* <div>
              <h1 className="font-bold text-xl text-gray-900">Admin Panel</h1>
              <p className="text-sm text-gray-500">CDI SAKATA INX CORP.</p>
            </div> */}
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm font-medium text-blue-900">Welcome back!</p>
            <p className="text-xs text-blue-700">{admin?.username}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelected(item.id);
                  if (item.id === 'news') setNewsSubSection('manage');
                }}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  selected === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${selected === item.id ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-600" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Dashboard Overview */}
        {selected === 'dashboard' && (
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
              <p className="text-gray-600">Manage your website content and monitor performance</p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {dashboardStats.loading ? (
                    <div className="w-8 h-8 animate-pulse bg-gray-200 rounded"></div>
                  ) : (
                    dashboardStats.news
                  )}
                </h3>
                <p className="text-sm text-gray-600">News Articles</p>
                <div className="mt-3 flex items-center text-xs text-green-600">
                  <span>Active posts</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {dashboardStats.loading ? (
                    <div className="w-8 h-8 animate-pulse bg-gray-200 rounded"></div>
                  ) : (
                    dashboardStats.careers
                  )}
                </h3>
                <p className="text-sm text-gray-600">Career Openings</p>
                <div className="mt-3 flex items-center text-xs text-green-600">
                  <span>Available positions</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {dashboardStats.loading ? (
                    <div className="w-8 h-8 animate-pulse bg-gray-200 rounded"></div>
                  ) : (
                    dashboardStats.products
                  )}
                </h3>
                <p className="text-sm text-gray-600">Products</p>
                <div className="mt-3 flex items-center text-xs text-green-600">
                  <span>Active listings</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {dashboardStats.loading ? (
                    <div className="w-8 h-8 animate-pulse bg-gray-200 rounded"></div>
                  ) : (
                    dashboardStats.certificates
                  )}
                </h3>
                <p className="text-sm text-gray-600">Certificates</p>
                <div className="mt-3 flex items-center text-xs text-blue-600">
                  <span>ISO & Quality</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => {
                    setSelected('news');
                    setNewsSubSection('add');
                  }}
                  className="p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <FileText className="w-8 h-8 text-gray-400 group-hover:text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600">Add News</p>
                </button>
                
                <button 
                  onClick={() => setSelected('products')}
                  className="p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 group"
                >
                  <Package className="w-8 h-8 text-gray-400 group-hover:text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600 group-hover:text-purple-600">Manage Products</p>
                </button>
                
                <button 
                  onClick={() => setSelected('careers')}
                  className="p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all duration-200 group"
                >
                  <Briefcase className="w-8 h-8 text-gray-400 group-hover:text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600 group-hover:text-green-600">Update Careers</p>
                </button>
                
                <button 
                  onClick={() => setSelected('certificates')}
                  className="p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 group"
                >
                  <Award className="w-8 h-8 text-gray-400 group-hover:text-orange-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600 group-hover:text-orange-600">Certificates</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* News & Blog Combined Section */}
        {selected === 'news' && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">News & Blog Management</h1>
                <p className="text-gray-600">Create and manage your news articles and blog posts</p>
              </div>
              <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200">
                <button
                  onClick={() => setNewsSubSection('manage')}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    newsSubSection === 'manage'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Manage Posts
                </button>
                <button
                  onClick={() => setNewsSubSection('add')}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    newsSubSection === 'add'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Add New
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px]">
              {newsSubSection === 'manage' ? <BlogPosts /> : <AddNewPost />}
            </div>
          </div>
        )}

        {/* Other Sections */}
        {selected === 'careers' && (
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Careers Management</h1>
              <p className="text-gray-600">Manage job postings and career opportunities</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px]">
              <CareersAdminPage />
            </div>
          </div>
        )}

        {selected === 'products' && (
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Products Management</h1>
              <p className="text-gray-600">Manage your product catalog and information</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px]">
              <ProductsAdminPage />
            </div>
          </div>
        )}

        {selected === 'certificates' && (
          <div className="p-8">
            <CertificatesAdminPage />
          </div>
        )}

        {selected === 'gallery' && (
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gallery Management</h1>
              <p className="text-gray-600">Manage homepage gallery showcase images</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px]">
              <GalleryAdminPage />
            </div>
          </div>
        )}

        {selected === 'password' && (
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Settings</h1>
              <p className="text-gray-600">Update your password and security preferences</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <ChangePassword />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;