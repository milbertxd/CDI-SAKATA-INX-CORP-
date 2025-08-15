const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all gallery images
router.get('/', async (req, res) => {
  try {
    console.log('🔍 Fetching gallery images...');
    
    const query = 'SELECT * FROM gallery_images WHERE is_active = 1 ORDER BY display_order ASC, created_at DESC';
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('❌ Database error:', err);
        return res.status(500).json({ error: 'Failed to fetch gallery images' });
      }
      
      console.log(`✅ Found ${results.length} gallery images`);
      res.json(results);
    });
  } catch (error) {
    console.error('❌ Route error:', error);
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
});

// Create new gallery image
router.post('/', async (req, res) => {
  try {
    const { title, description, image_url, display_order } = req.body;
    
    const query = 'INSERT INTO gallery_images (title, description, image_url, display_order) VALUES (?, ?, ?, ?)';
    const values = [title, description, image_url, display_order || 0];
    
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('❌ Insert error:', err);
        return res.status(500).json({ error: 'Failed to create gallery image' });
      }
      
      console.log('✅ Gallery image created with ID:', result.insertId);
      res.status(201).json({ 
        id: result.insertId, 
        title, 
        description, 
        image_url, 
        display_order: display_order || 0 
      });
    });
  } catch (error) {
    console.error('❌ Route error:', error);
    res.status(500).json({ error: 'Failed to create gallery image' });
  }
});

// Update gallery image
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image_url, display_order, is_active } = req.body;
    
    const query = 'UPDATE gallery_images SET title = ?, description = ?, image_url = ?, display_order = ?, is_active = ? WHERE id = ?';
    const values = [title, description, image_url, display_order, is_active, id];
    
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('❌ Update error:', err);
        return res.status(500).json({ error: 'Failed to update gallery image' });
      }
      
      console.log('✅ Gallery image updated:', id);
      res.json({ id, title, description, image_url, display_order, is_active });
    });
  } catch (error) {
    console.error('❌ Route error:', error);
    res.status(500).json({ error: 'Failed to update gallery image' });
  }
});

// Delete gallery image
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = 'DELETE FROM gallery_images WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('❌ Delete error:', err);
        return res.status(500).json({ error: 'Failed to delete gallery image' });
      }
      
      console.log('✅ Gallery image deleted:', id);
      res.json({ message: 'Gallery image deleted successfully' });
    });
  } catch (error) {
    console.error('❌ Route error:', error);
    res.status(500).json({ error: 'Failed to delete gallery image' });
  }
});

module.exports = router;