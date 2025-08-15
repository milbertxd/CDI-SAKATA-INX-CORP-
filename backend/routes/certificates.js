const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('./auth');

// GET all certificates
router.get('/', (req, res) => {
  const query = `
    SELECT * FROM certificates 
    WHERE is_active = true 
    ORDER BY display_order ASC, created_at DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching certificates:', err);
      return res.status(500).json({ error: 'Failed to fetch certificates' });
    }
    res.json(results);
  });
});

// GET single certificate by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM certificates WHERE id = ? AND is_active = true';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching certificate:', err);
      return res.status(500).json({ error: 'Failed to fetch certificate' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    
    res.json(results[0]);
  });
});

// POST create new certificate (Admin only)
router.post('/', verifyToken, (req, res) => {
  const {
    title,
    logo_image,
    certificate_image,
    display_order
  } = req.body;

  // Validation
  if (!title || !logo_image || !certificate_image) {
    return res.status(400).json({ error: 'Title, logo image, and certificate image are required' });
  }

  const query = `
    INSERT INTO certificates 
    (title, logo_image, certificate_image, display_order) 
    VALUES (?, ?, ?, ?)
  `;

  const values = [
    title,
    logo_image,
    certificate_image,
    display_order || 0
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error creating certificate:', err);
      return res.status(500).json({ error: 'Failed to create certificate' });
    }

    // Return the created certificate
    const selectQuery = 'SELECT * FROM certificates WHERE id = ?';
    db.query(selectQuery, [result.insertId], (err, results) => {
      if (err) {
        console.error('Error fetching created certificate:', err);
        return res.status(500).json({ error: 'Certificate created but failed to fetch details' });
      }
      
      res.status(201).json({
        message: 'Certificate created successfully',
        certificate: results[0]
      });
    });
  });
});

// PUT update certificate (Admin only)
router.put('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const {
    title,
    logo_image,
    certificate_image,
    display_order,
    is_active
  } = req.body;

  // Check if certificate exists
  const checkQuery = 'SELECT id FROM certificates WHERE id = ?';
  db.query(checkQuery, [id], (err, results) => {
    if (err) {
      console.error('Error checking certificate:', err);
      return res.status(500).json({ error: 'Failed to check certificate' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    // Update certificate
    const updateQuery = `
      UPDATE certificates SET 
        title = COALESCE(?, title),
        logo_image = COALESCE(?, logo_image),
        certificate_image = COALESCE(?, certificate_image),
        display_order = COALESCE(?, display_order),
        is_active = COALESCE(?, is_active),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const values = [
      title,
      logo_image,
      certificate_image,
      display_order,
      is_active,
      id
    ];

    db.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error('Error updating certificate:', err);
        return res.status(500).json({ error: 'Failed to update certificate' });
      }

      // Return updated certificate
      const selectQuery = 'SELECT * FROM certificates WHERE id = ?';
      db.query(selectQuery, [id], (err, results) => {
        if (err) {
          console.error('Error fetching updated certificate:', err);
          return res.status(500).json({ error: 'Certificate updated but failed to fetch details' });
        }
        
        res.json({
          message: 'Certificate updated successfully',
          certificate: results[0]
        });
      });
    });
  });
});

// DELETE certificate (soft delete - Admin only)
router.delete('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  
  // Soft delete by setting is_active to false
  const query = 'UPDATE certificates SET is_active = false, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting certificate:', err);
      return res.status(500).json({ error: 'Failed to delete certificate' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    res.json({ message: 'Certificate deleted successfully' });
  });
});

module.exports = router;
