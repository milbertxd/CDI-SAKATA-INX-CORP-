const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

// CORS configuration - Allow multiple origins in development
const allowedOrigins = [
  'http://localhost:8080',
  'http://127.0.0.1:8080',
  process.env.CORS_ORIGIN
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // In development, be more permissive
      if (process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Also serve from public directory for existing images
app.use(express.static(path.join(__dirname, '../public')));

// Log static file setup
if (process.env.NODE_ENV !== 'production') {
  console.log('📁 Static files from:', path.join(__dirname, 'public/uploads'));
  console.log('📁 Public files from:', path.join(__dirname, '../public'));
  console.log('🚀 Starting server with router structure...');
  console.log('🔐 CORS allowed origins:', allowedOrigins);
  console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
}

// Setup tables when server starts
const { setupCertificatesTable } = require('./setup-certificates');
const { createProductsTable } = require('./setup-products-table');
const { createCareersTable } = require('./setup-careers-table');
const { addPdfColumnsToProductsTable } = require('./update-products-table');

setTimeout(() => {
  setupCertificatesTable();
  createProductsTable();
  createCareersTable();
  addPdfColumnsToProductsTable();
}, 1000);

// Import routes
const newsRouter = require('./routes/news');
const careersRouter = require('./routes/careers');
const productsRouter = require('./routes/products');
const certificatesRouter = require('./routes/certificates');
const uploadRouter = require('./routes/upload');
const { router: authRouter } = require('./routes/auth');
const galleryRoutes = require('./routes/gallery');

// Use routes
app.use('/api/news', newsRouter);
app.use('/api/careers', careersRouter);
app.use('/api/products', productsRouter);
app.use('/api/certificates', certificatesRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/auth', authRouter);
app.use('/api/gallery', galleryRoutes);

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: '🎉 SERVER STARTED WITH ROUTER STRUCTURE!' });
});

// Get network interfaces for network access
const os = require('os');
const networkInterfaces = os.networkInterfaces();
let localIp = 'localhost';

Object.keys(networkInterfaces).forEach(interfaceName => {
  const interfaces = networkInterfaces[interfaceName];
  interfaces.forEach(interfaceInfo => {
    if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
      localIp = interfaceInfo.address;
    }
  });
});

// Start server
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    if (err.code === 'EADDRINUSE') {
      console.log('❌ Port 5002 is already in use!');
      console.log('💡 Another server is running on port 5002');
      return;
    }
    console.error('❌ Failed to start server:', err);
    return;
  }
  
  console.log('🎉 SERVER STARTED WITH ROUTER STRUCTURE!');
  console.log('🌐 Server running on:');
  console.log(`   📍 Local: http://localhost:${PORT}`);
  console.log(`   📍 Network: http://${localIp}:${PORT}`);
  console.log('🔗 API Endpoints:');
  console.log(`   🔐 Auth: http://${localIp}:${PORT}/api/auth`);
  console.log(`   📰 News: http://${localIp}:${PORT}/api/news`);
  console.log(`   💼 Careers: http://${localIp}:${PORT}/api/careers`);
  console.log(`   📦 Products: http://${localIp}:${PORT}/api/products`);
  console.log(`   🏆 Certificates: http://${localIp}:${PORT}/api/certificates`);
  console.log(`   📤 Upload: http://${localIp}:${PORT}/api/upload`);
  console.log(`   🖼️ Gallery: http://${localIp}:${PORT}/api/gallery`);
  console.log('');
  console.log('🌍 Server accessible from other devices on your network!');
});
