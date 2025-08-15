const mysql = require('mysql2');

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_news',
});

// Test connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
  console.log('✅ Connected to MySQL database');
});

module.exports = db;
