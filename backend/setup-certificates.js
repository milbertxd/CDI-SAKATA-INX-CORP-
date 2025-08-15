const db = require('./db');

// Setup certificates table
const setupCertificatesTable = () => {
  console.log('🔧 Setting up simplified certificates table...');
  
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS certificates (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      logo_image VARCHAR(500) NOT NULL,
      certificate_image VARCHAR(500) NOT NULL,
      display_order INT DEFAULT 0,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  db.query(createTableQuery, (err) => {
    if (err) {
      console.error('❌ Failed to create certificates table:', err);
      return;
    }
    console.log('✅ Certificates table ready');

    // Check if we need to insert default data
    const checkDataQuery = 'SELECT COUNT(*) as count FROM certificates';
    db.query(checkDataQuery, (err, results) => {
      if (err) {
        console.error('❌ Failed to check certificates data:', err);
        return;
      }

      const count = results[0].count;
      if (count === 0) {
        console.log('📝 Inserting default certificates...');
        
        const insertDefaultQuery = `
          INSERT INTO certificates (title, logo_image, certificate_image, display_order) VALUES
          ('ISO 9001:2015 Certified', '/socotec1.jpg', '/iso-pic.jpg', 1),
          ('Halal Certified', '/halal.png', '/halah-pic.jpg', 2)
        `;

        db.query(insertDefaultQuery, (err) => {
          if (err) {
            console.error('❌ Failed to insert default certificates:', err);
            return;
          }
          console.log('✅ Default certificates inserted');
        });
      } else {
        console.log(`✅ Found ${count} existing certificates`);
      }
    });
  });
};

module.exports = { setupCertificatesTable };
