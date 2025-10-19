const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');
require('dotenv').config();

// JWT Secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production';

// 📍 Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes working!' });
});

// 📍 Admin Login
router.post('/login', async (req, res) => {
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

// 📍 Verify Authentication Status
router.get('/verify', verifyToken, (req, res) => {
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

// 📍 Logout (optional - mainly handled on frontend)
router.post('/logout', verifyToken, (req, res) => {
  // In a real app, you might want to blacklist the token
  res.json({ success: true, message: 'Logged out successfully' });
});

// 📍 Change Password
router.post('/change-password', verifyToken, async (req, res) => {
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

// Export both the router and the middleware
module.exports = { router, verifyToken };
