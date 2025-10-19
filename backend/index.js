const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { setupCertificatesTable } = require('./setup-certificates');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

// JWT Secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production';

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  console.log('🚀 Starting unified server...');
}

// MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',       
  password: process.env.DB_PASSWORD || '',       
  database: process.env.DB_NAME || 'db_news' 
});

// Test connection
db.connect(err => {
  if (err) {
    console.error('❌ Failed to connect to MySQL:', err.message);
    process.exit(1);
  }
  if (process.env.NODE_ENV !== 'production') {
    console.log('✅ Connected to MySQL');
  }
  
  // Setup certificates table
  setupCertificatesTable();
});

// 📍 Verify Token Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.admin = decoded;
    next();
  });
};

// ===== AUTH ROUTES =====
app.get('/api/auth/test', (req, res) => {
  res.json({ message: 'Auth routes working!' });
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  // Query admin user from database
  db.query('SELECT * FROM admin_users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = results[0];
    
    try {
      // Compare password with hashed password
      const passwordMatch = await bcrypt.compare(password, admin.password_hash);
      
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: admin.id, 
          username: admin.username,
          role: admin.role 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Update last login
      db.query('UPDATE admin_users SET last_login = NOW() WHERE id = ?', [admin.id]);

      res.json({
        success: true,
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          role: admin.role,
          created_at: admin.created_at
        }
      });

    } catch (error) {
      console.error('Password comparison error:', error);
      res.status(500).json({ error: 'Authentication error' });
    }
  });
});

app.get('/api/auth/verify', verifyToken, (req, res) => {
  // If we reach here, token is valid
  res.json({ 
    success: true, 
    admin: {
      id: req.admin.id,
      username: req.admin.username,
      role: req.admin.role
    }
  });
});

app.post('/api/auth/logout', verifyToken, (req, res) => {
  // In a real app, you might want to blacklist the token
  res.json({ success: true, message: 'Logged out successfully' });
});

app.post('/api/auth/change-password', verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  console.log('Password change request received for user ID:', req.admin.id);
  
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current password and new password are required' });
  }
  
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters long' });
  }
  
  try {
    // Get current admin user
    db.query('SELECT * FROM admin_users WHERE id = ?', [req.admin.id], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (results.length === 0) {
        console.log('Admin user not found for ID:', req.admin.id);
        return res.status(404).json({ error: 'Admin user not found' });
      }
      
      const admin = results[0];
      console.log('Found admin user:', admin.username);
      
      // Verify current password
      const currentPasswordMatch = await bcrypt.compare(currentPassword, admin.password_hash);
      console.log('Current password match:', currentPasswordMatch);
      
      if (!currentPasswordMatch) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }
      
      // Hash new password
      console.log('Hashing new password...');
      const newPasswordHash = await bcrypt.hash(newPassword, 10);
      
      // Update password in database
      console.log('Updating password in database...');
      db.query(
        'UPDATE admin_users SET password_hash = ? WHERE id = ?',
        [newPasswordHash, req.admin.id],
        (err, result) => {
          if (err) {
            console.error('Update error:', err);
            return res.status(500).json({ error: 'Failed to update password' });
          }
          
          console.log('Password updated successfully, affected rows:', result.affectedRows);
          res.json({ 
            success: true, 
            message: 'Password changed successfully' 
          });
        }
      );
    });
    
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ error: 'Password change failed' });
  }
});

// ===== NEWS ROUTES =====
app.get('/api/news', (req, res) => {
  db.query('SELECT * FROM news ORDER BY id DESC', (err, results) => {
    if (err) {
      console.error('Error fetching news:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.post('/api/news', (req, res) => {
  const newsItem = req.body;
  db.query('INSERT INTO news SET ?', newsItem, (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ error: 'Insert error' });
    }
    res.json({ id: result.insertId, ...newsItem });
  });
});

// CAREERS ROUTES
app.get('/api/careers', (req, res) => {
  db.query('SELECT * FROM careers ORDER BY date_posted DESC, id DESC', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      // Parse JSON fields
      results.forEach(job => {
        ['responsibilities', 'requirements', 'qualifications', 'questions'].forEach(field => {
          if (job[field]) {
            try { job[field] = JSON.parse(job[field]); }
            catch { job[field] = []; }
          } else {
            job[field] = [];
          }
        });
      });
      res.json(results);
    }
  });
});

// PRODUCTS ROUTES
app.get('/api/products', (req, res) => {
  console.log('🔥 Products API endpoint hit!');
  const query = `
    SELECT * FROM products 
    WHERE is_active = true 
    ORDER BY display_order ASC, created_at DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      console.log(`📊 Found ${results.length} products`);
      // Parse JSON fields
      results.forEach(product => {
        ['features', 'applications'].forEach(field => {
          if (product[field]) {
            try { 
              product[field] = JSON.parse(product[field]); 
            } catch { 
              product[field] = []; 
            }
          } else {
            product[field] = [];
          }
        });
      });
      res.json(results);
    }
  });
});

app.get('/api/products/:id', (req, res) => {
  db.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, results) => {
    if (err || results.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      const product = results[0];
      ['features', 'applications'].forEach(field => {
        if (product[field]) {
          try { 
            product[field] = JSON.parse(product[field]); 
          } catch { 
            product[field] = []; 
          }
        } else {
          product[field] = [];
        }
      });
      res.json(product);
    }
  });
});

// POST new product
app.post('/api/products', (req, res) => {
  const { name, category, description, features, applications, image } = req.body;
  
  if (!name || !category || !description) {
    return res.status(400).json({ error: 'Name, category and description are required' });
  }

  const featuresJson = JSON.stringify(features || []);
  const applicationsJson = JSON.stringify(applications || []);
  
  const query = `
    INSERT INTO products (name, category, description, features, applications, image, is_active, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, true, NOW())
  `;
  
  db.query(query, [name, category, description, featuresJson, applicationsJson, image || null], (err, result) => {
    if (err) {
      console.error('Error creating product:', err);
      return res.status(500).json({ error: 'Failed to create product' });
    }
    res.status(201).json({ 
      message: 'Product created successfully',
      id: result.insertId 
    });
  });
});

// PUT update product
app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const { name, category, description, features, applications, image } = req.body;
  
  if (!name || !category || !description) {
    return res.status(400).json({ error: 'Name, category and description are required' });
  }

  const featuresJson = JSON.stringify(features || []);
  const applicationsJson = JSON.stringify(applications || []);
  
  const query = `
    UPDATE products 
    SET name = ?, category = ?, description = ?, features = ?, applications = ?, image = ?, updated_at = NOW()
    WHERE id = ?
  `;
  
  db.query(query, [name, category, description, featuresJson, applicationsJson, image || null, productId], (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ error: 'Failed to update product' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product updated successfully' });
  });
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  
  const query = 'DELETE FROM products WHERE id = ?';
  
  db.query(query, [productId], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({ error: 'Failed to delete product' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  });
});

// ===== CERTIFICATES ROUTES =====
// GET all certificates
app.get('/api/certificates', (req, res) => {
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
app.get('/api/certificates/:id', (req, res) => {
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
app.post('/api/certificates', verifyToken, (req, res) => {
  const {
    title,
    description,
    image_url,
    full_document_url,
    certificate_type,
    issue_date,
    expiry_date,
    issuing_authority,
    display_order
  } = req.body;

  // Validation
  if (!title || !image_url) {
    return res.status(400).json({ error: 'Title and image URL are required' });
  }

  const query = `
    INSERT INTO certificates 
    (title, description, image_url, full_document_url, certificate_type, issue_date, expiry_date, issuing_authority, display_order) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    title,
    description || null,
    image_url,
    full_document_url || null,
    certificate_type || 'OTHER',
    issue_date || null,
    expiry_date || null,
    issuing_authority || null,
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
app.put('/api/certificates/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    image_url,
    full_document_url,
    certificate_type,
    issue_date,
    expiry_date,
    issuing_authority,
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
        description = COALESCE(?, description),
        image_url = COALESCE(?, image_url),
        full_document_url = COALESCE(?, full_document_url),
        certificate_type = COALESCE(?, certificate_type),
        issue_date = COALESCE(?, issue_date),
        expiry_date = COALESCE(?, expiry_date),
        issuing_authority = COALESCE(?, issuing_authority),
        display_order = COALESCE(?, display_order),
        is_active = COALESCE(?, is_active),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const values = [
      title,
      description,
      image_url,
      full_document_url,
      certificate_type,
      issue_date,
      expiry_date,
      issuing_authority,
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
app.delete('/api/certificates/:id', verifyToken, (req, res) => {
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

console.log('✅ All routes loaded');

const server = app.listen(PORT, () => {
  console.log(`🎉 UNIFIED SERVER STARTED!`);
  console.log(`🌐 Server running on: http://localhost:${PORT}`);
  console.log(`🔗 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(`🔗 News API: http://localhost:${PORT}/api/news`);
  console.log(`🔗 Careers API: http://localhost:${PORT}/api/careers`);  
  console.log(`🔗 Products API: http://localhost:${PORT}/api/products`);
  console.log(`🔗 Certificates API: http://localhost:${PORT}/api/certificates`);
  console.log(`\n🛑 Press Ctrl+C to stop the server`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use!`);
    console.error(`💡 Another server is running on port ${PORT}`);
    console.error(`💡 Solution 1: Stop the other server first`);
    console.error(`💡 Solution 2: Use restart-server.bat to kill existing processes`);
    console.error(`💡 Solution 3: Change PORT to 5001 in this file`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', err);
  }
});
