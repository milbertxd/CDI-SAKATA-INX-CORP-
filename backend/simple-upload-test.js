// Simple working upload test
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), (req, res) => {
  console.log('File received:', req.file);
  if (req.file) {
    res.json({ 
      success: true, 
      filePath: `/uploads/${req.file.filename}` 
    });
  } else {
    res.status(400).json({ error: 'No file' });
  }
});

app.listen(5004, () => {
  console.log('Simple upload server on http://localhost:5004');
});
