// API Configuration
// Automatically detect if we're accessing via network IP and protocol
const getAPIBaseURL = () => {
  // Check if we're in development and accessing via network IP
  const currentHost = window.location.hostname;
  const currentProtocol = window.location.protocol;
  const isHTTPS = currentProtocol === 'https:';
  
  // Determine backend port based on protocol
  const backendPort = isHTTPS ? '5003' : '5002'; // HTTPS on 5003, HTTP on 5002
  
  // If accessing via network IP (not localhost), use the same IP for API
  if (currentHost !== 'localhost' && currentHost !== '127.0.0.1') {
    return `${currentProtocol}//${currentHost}:${backendPort}`;
  }
  
  // Otherwise use environment variable or localhost fallback
  const protocol = isHTTPS ? 'https' : 'http';
  return import.meta.env.VITE_API_URL || `${protocol}://localhost:${backendPort}`;
};

export const API_BASE_URL = getAPIBaseURL();
export const NODE_ENV = import.meta.env.VITE_NODE_ENV || 'development';

// API Endpoints
export const API_ENDPOINTS = {
  NEWS: `${API_BASE_URL}/api/news`,
  PRODUCTS: `${API_BASE_URL}/api/products`,
  CAREERS: `${API_BASE_URL}/api/careers`,
  CERTIFICATES: `${API_BASE_URL}/api/certificates`,
  UPLOAD: `${API_BASE_URL}/api/upload`,
  ADMIN_LOGIN: `${API_BASE_URL}/api/admin/login`,
} as const;

// Helper function to build full image URLs
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE_URL}${imagePath}`;
};

console.log('🔧 API Configuration:', {
  baseUrl: API_BASE_URL,
  environment: NODE_ENV
});
