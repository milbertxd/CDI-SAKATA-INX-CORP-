const express = require('express');
const router = express.Router();
const db = require('../db');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Products routes working!' });
});

// Get all products
router.get('/', (req, res) => {
  const query = 'SELECT * FROM products ORDER BY created_at DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    
    // Parse JSON fields
    const products = results.map(product => ({
      ...product,
      features: product.features ? JSON.parse(product.features) : [],
      applications: product.applications ? JSON.parse(product.applications) : []
    }));
    
    res.json(products);
  });
});

// Get a specific product by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const query = 'SELECT * FROM products WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).json({ error: 'Failed to fetch product' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const product = {
      ...results[0],
      features: results[0].features ? JSON.parse(results[0].features) : [],
      applications: results[0].applications ? JSON.parse(results[0].applications) : []
    };
    
    res.json(product);
  });
});

// Create a new product
router.post('/', (req, res) => {
  const { title, subtitle, description, features, applications, category, image_url, tds_file, sds_file, display_order } = req.body;
  
  // Convert arrays to JSON strings if they exist
  const featuresJson = features ? JSON.stringify(features) : null;
  const applicationsJson = applications ? JSON.stringify(applications) : null;
  
  const query = `
    INSERT INTO products (title, subtitle, description, features, applications, category, image_url, tds_file, sds_file, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.query(
    query, 
    [title, subtitle, description, featuresJson, applicationsJson, category, image_url, tds_file, sds_file, display_order || 0],
    (err, results) => {
      if (err) {
        console.error('❌ Error creating product:', err);
        return res.status(500).json({ error: 'Failed to create product' });
      }
      res.status(201).json({ id: results.insertId, message: 'Product created successfully' });
    }
  );
});

// Update a product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, subtitle, description, features, applications, category, image_url, tds_file, sds_file, display_order } = req.body;
  
  // Convert arrays to JSON strings if they exist
  const featuresJson = features ? JSON.stringify(features) : null;
  const applicationsJson = applications ? JSON.stringify(applications) : null;
  
  const query = `
    UPDATE products 
    SET title = ?, subtitle = ?, description = ?, 
        features = ?, applications = ?, category = ?, 
        image_url = ?, tds_file = ?, sds_file = ?, display_order = ?
    WHERE id = ?
  `;
  
  db.query(
    query,
    [title, subtitle, description, featuresJson, applicationsJson, category, image_url, tds_file, sds_file, display_order || 0, id],
    (err, results) => {
      if (err) {
        console.error('❌ Error updating product:', err);
        return res.status(500).json({ error: 'Failed to update product' });
      }
      
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.json({ id, message: 'Product updated successfully' });
    }
  );
});

// Delete a product
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  const query = 'DELETE FROM products WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({ error: 'Failed to delete product' });
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  });
});

module.exports = router;