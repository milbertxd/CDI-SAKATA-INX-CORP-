const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Simple test route
router.get('/test', (req, res) => {
  res.json({ message: 'Upload route is working!' });
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../public/uploads');
console.log('📁 Creating uploads directory at:', uploadsDir);

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Uploads directory created');
} else {
  console.log('✅ Uploads directory already exists');
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = file.fieldname + '-' + uniqueSuffix + ext;
    cb(null, name);
  }
});

// File filter - Updated to accept both images and PDFs
const fileFilter = (req, file, cb) => {
  // Check file type - allow images and PDFs
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only image and PDF files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB for PDFs
  },
  fileFilter: fileFilter
});

// Upload endpoint - handle both 'file' and 'image' field names
router.post('/', upload.any(), (req, res) => {
  try {
    // Handle both 'file' and 'image' field names
    const uploadedFile = req.files && req.files.length > 0 ? req.files[0] : null;
    
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = `/uploads/${uploadedFile.filename}`;
    
    console.log('✅ File uploaded successfully:', filePath);
    console.log('📝 Field name used:', uploadedFile.fieldname);
    res.json({
      success: true,
      message: 'File uploaded successfully',
      url: filePath,              // ✅ Add this line - frontend expects 'url'
      filePath: filePath,         // Keep existing
      path: filePath,            // ✅ Add this line - frontend fallback expects 'path'  
      filename: uploadedFile.filename,
      originalName: uploadedFile.originalname,
      size: uploadedFile.size,
      mimetype: uploadedFile.mimetype,
      fieldName: uploadedFile.fieldname
    });

  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Error handling middleware
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 100MB.' });
    }
  }
  
  if (error.message === 'Only image and PDF files are allowed!') {
    return res.status(400).json({ error: 'Only image and PDF files are allowed!' });
  }
  
  res.status(500).json({ error: error.message });
});

module.exports = router;
