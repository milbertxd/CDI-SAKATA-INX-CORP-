const mysql = require('mysql2');

// Create connection without specifying database first
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // XAMPP default
});

console.log('🔧 Setting up database...');

connection.connect((err) => {
  if (err) {
    console.log('❌ Cannot connect to MySQL:', err.message);
    process.exit(1);
  }
  
  console.log('✅ Connected to MySQL');
  
  // Create database
  connection.query('CREATE DATABASE IF NOT EXISTS db_news', (err) => {
    if (err) {
      console.log('❌ Cannot create database:', err.message);
    } else {
      console.log('✅ Database db_news created/exists');
    }
    
    // Use the database
    connection.query('USE db_news', (err) => {
      if (err) {
        console.log('❌ Cannot use database:', err.message);
        process.exit(1);
      }
      
      // Create products table
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS products (
          id INT PRIMARY KEY AUTO_INCREMENT,
          title VARCHAR(255) NOT NULL,
          subtitle VARCHAR(255),
          category ENUM('digital', 'offset', 'specialty', 'sustainable') NOT NULL,
          description TEXT,
          features JSON,
          applications JSON,
          image_url VARCHAR(255),
          is_active BOOLEAN DEFAULT true,
          display_order INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `;
      
      connection.query(createTableQuery, (err) => {
        if (err) {
          console.log('❌ Cannot create products table:', err.message);
        } else {
          console.log('✅ Products table created/exists');
          
          // Insert sample data
          const insertQuery = `
            INSERT IGNORE INTO products (id, title, subtitle, category, description, features, applications, image_url, display_order) VALUES 
            (1, 'Lamiall Inks', 'Solvent-Based Lamination Series', 'digital', 'High-gloss inks made for laminated flexible packaging with strong solvent resistance and print fidelity.', 
            '["High bond strength", "Glossy finish", "Excellent printability", "Solvent resistance"]', 
            '["Snack packaging", "Flexible pouches", "Chips bags", "Condiment sachets"]', 
            '/images/lamiall.jpg', 1)
          `;
          
          connection.query(insertQuery, (err) => {
            if (err) {
              console.log('❌ Cannot insert sample data:', err.message);
            } else {
              console.log('✅ Sample product inserted');
            }
            
            // Verify data
            connection.query('SELECT COUNT(*) as count FROM products', (err, results) => {
              if (err) {
                console.log('❌ Cannot count products:', err.message);
              } else {
                console.log(`✅ Products table now has ${results[0].count} records`);
              }
              
              connection.end();
              console.log('🎉 Database setup complete!');
            });
          });
        }
      });
    });
  });
});
