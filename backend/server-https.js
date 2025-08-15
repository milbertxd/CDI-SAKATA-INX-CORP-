// HTTPS Server Configuration for SAKATA INX
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Import existing routes from server-with-routes.js
const app = express();
const PORT = 5003; // Different port for HTTPS

// CORS configuration for HTTPS
app.use(cors({
  origin: ['https://localhost:5173', 'https://192.168.1.100:5173', /^https:\/\/.*$/],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import all routes from the main server
// (You can copy routes from server-with-routes.js here)

// For development, create self-signed certificates
// In production, use proper SSL certificates from Let's Encrypt

const httpsOptions = {
  // These would be your SSL certificate files
  // key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
  // cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
};

// Fallback to HTTP if SSL certificates don't exist
const startServer = () => {
  try {
    // Try HTTPS first
    if (fs.existsSync(path.join(__dirname, 'ssl', 'key.pem'))) {
      https.createServer(httpsOptions, app).listen(PORT, '0.0.0.0', () => {
        console.log(`🔐 HTTPS Server running on https://localhost:${PORT}`);
      });
    } else {
      // Fallback to HTTP
      console.log('⚠️  SSL certificates not found, running HTTP server');
      console.log('📋 To enable HTTPS, create SSL certificates in ./ssl/ directory');
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`🌐 HTTP Server running on http://localhost:${PORT}`);
      });
    }
  } catch (error) {
    console.error('❌ Server startup error:', error);
  }
};

startServer();

module.exports = app;
