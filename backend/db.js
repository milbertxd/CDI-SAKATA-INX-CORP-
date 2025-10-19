const mysql = require('mysql2');
require('dotenv').config();

// MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'db_news',
});

// Test connection
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
  if (process.env.NODE_ENV !== 'production') {
    console.log('✅ Connected to MySQL database');
  }
});

module.exports = db;
