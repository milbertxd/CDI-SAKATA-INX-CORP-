import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, Eye, EyeOff, Shield, LogOut } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, admin } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (admin) {
      navigate('/admin/dashboard');
    }
  }, [admin, navigate]);

  // Add a logout function to clear tokens
  const handleForceLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.reload(); // Force refresh to clear all state
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-ping"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main Login Container */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-8 text-center relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="mb-4">
                <img 
                  src="/logo.png" 
                  alt="CDI Sakata INX Logo" 
                  className="h-16 w-auto object-contain mx-auto"
                  onError={(e) => {
                    console.log('Failed to load /logo.png, trying /Container.png');
                    (e.target as HTMLImageElement).src = '/Container.png';
                  }}
                />
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">Admin Portal</h1>
              {/* <p className="text-blue-100 text-sm font-medium">CDI Sakata INX Corporation</p> */}
            </div>
          </div>

          {/* Login Form Section */}
          <div className="px-8 py-8">
            {/* Already Logged In Alert */}
            {admin && (
              <div className="mb-8 p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-amber-600" />
                  </div>
                  <p className="text-sm font-bold text-amber-800">Already Authenticated</p>
                </div>
                <p className="text-sm text-amber-700 mb-4">
                  Logged in as <span className="font-bold text-amber-900">{admin.username}</span>
                </p>
                <button 
                  onClick={handleForceLogout}
                  className="flex items-center gap-2 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <LogOut className="w-4 h-4" />
                  Switch Account
                </button>
              </div>
            )}

            {/* Welcome Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Enter your credentials to access the dashboard</p>
            </div>
            
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-blue-600">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    disabled={isLoading}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900 placeholder-gray-500 font-medium"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-blue-600">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900 placeholder-gray-500 font-medium"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-xl transition-all duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 rounded-xl">
                  <p className="text-sm text-red-700 flex items-center gap-3 font-medium">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Lock className="w-3 h-3 text-red-600" />
                    </div>
                    {error}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white py-4 px-6 rounded-xl font-bold text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Shield className="w-5 h-5" />
                    <span>Access Dashboard</span>
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-1">© 2025 CDI Sakata INX Corporation</p>
            <p className="text-xs text-gray-500 font-medium">Secure Administrative Access</p>
          </div>
        </div>

        {/* Additional Security Badge */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <Shield className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">256-bit SSL Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
