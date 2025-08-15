const express = require('express');
const router = express.Router();
const db = require('../db');

// 📍 GET all news
router.get('/', (req, res) => {
  db.query('SELECT * FROM news ORDER BY id DESC', (err, results) => {
    if (err) {
      console.error('Error fetching news:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Transform data to ensure proper format for frontend
    const transformedResults = results.map(item => {
      // Convert categories string back to array for frontend if needed
      if (item.categories && typeof item.categories === 'string') {
        // Keep as string for now, frontend will handle the conversion
        // item.categories = item.categories.split(',').map(c => c.trim());
      }
      
      // Ensure boolean values are properly typed
      item.isFeatured = Boolean(item.isFeatured);
      item.isExternalLink = Boolean(item.isExternalLink);
      
      return item;
    });
    
    res.json(transformedResults);
  });
});

// 📍 GET one news by id
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM news WHERE id = ?', [req.params.id], (err, results) => {
    if (err || results.length === 0) {
      res.status(404).json({ error: 'News not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// 📍 POST new news (RESTORED to your working version)
router.post('/', (req, res) => {
  console.log('🔥 POST request received for news');
  console.log('🔥 Full request body:', JSON.stringify(req.body, null, 2));
  
  // Process the categories array to string for database storage
  const newsItem = { ...req.body };
  
  // Convert categories array to comma-separated string if it's an array
  if (Array.isArray(newsItem.categories)) {
    newsItem.categories = newsItem.categories.join(',');
  }
  
  // Handle backward compatibility - if no categories but has category, use it
  if (!newsItem.categories && newsItem.category) {
    newsItem.categories = newsItem.category;
  }
  
  db.query('INSERT INTO news SET ?', newsItem, (err, result) => {
    if (err) {
      console.error('❌ INSERT ERROR:', err);
      console.error('❌ Error code:', err.code);
      console.error('❌ Error message:', err.message);
      return res.status(500).json({ 
        error: 'Insert error', 
        details: err.message
      });
    }
    
    console.log('✅ Insert successful! ID:', result.insertId);
    res.json({ id: result.insertId, ...newsItem });
  });
});

// 📍 PUT update news (RESTORED to your working version)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const newsItem = { ...req.body };
  
  console.log('🔥 PUT request received for news ID:', id);
  console.log('🔥 Full request body:', JSON.stringify(req.body, null, 2));

  // Process the categories array to string for database storage
  if (Array.isArray(newsItem.categories)) {
    newsItem.categories = newsItem.categories.join(',');
  }
  
  // Handle backward compatibility - if no categories but has category, use it
  if (!newsItem.categories && newsItem.category) {
    newsItem.categories = newsItem.category;
  }

  // Handle isFeatured logic like in your working version
  if (newsItem.isFeatured) {
    // Unfeature all other posts first
    await new Promise((resolve, reject) => {
      db.query('UPDATE news SET isFeatured = FALSE WHERE isFeatured = TRUE', (err) => {
        if (err) reject(err); else resolve();
      });
    });
  }

  // Use your original working approach
  db.query('UPDATE news SET ? WHERE id = ?', [newsItem, id], (err, result) => {
    if (err) {
      console.error('❌ UPDATE ERROR:', err);
      console.error('❌ Error code:', err.code);
      console.error('❌ Error message:', err.message);
      return res.status(500).json({ 
        error: 'Update error', 
        details: err.message
      });
    }
    
    if (result.affectedRows === 0) {
      console.log('❌ No rows affected - news item not found');
      return res.status(404).json({ error: 'News item not found' });
    }
    
    console.log('✅ Update successful! Affected rows:', result.affectedRows);
    res.json({ success: true, id, ...newsItem });
  });
});

// 📍 DELETE news
router.delete('/:id', (req, res) => {
  const newsId = req.params.id;
  
  db.query('DELETE FROM news WHERE id = ?', [newsId], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Delete error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    res.json({ success: true, message: 'News deleted successfully' });
  });
});

module.exports = router;
