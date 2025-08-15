const db = require('./db');

const createProductsTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      subtitle VARCHAR(255) DEFAULT '',
      category VARCHAR(100) NOT NULL,
      description TEXT DEFAULT '',
      features JSON,
      applications JSON,
      image_url VARCHAR(500) DEFAULT '',
      display_order INT DEFAULT 0,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('❌ Error creating products table:', err);
    } else {
      console.log('✅ Products table created successfully');
      
      // Check if table is empty and add sample data
      db.query('SELECT COUNT(*) as count FROM products', (err, results) => {
        if (err) {
          console.error('Error checking products count:', err);
          return;
        }
        
        if (results[0].count === 0) {
          console.log('📝 Adding sample product...');
          const sampleProduct = {
            title: 'Premium Canned Food',
            subtitle: 'High-quality preserved food',
            category: 'Food Products',
            description: 'Our premium canned food products offer exceptional quality and taste.',
            features: JSON.stringify(['Long shelf life', 'High nutritional value', 'Easy to store']),
            applications: JSON.stringify(['Home cooking', 'Emergency supplies', 'Bulk storage']),
            image_url: '/can1.png',
            display_order: 1,
            is_active: true
          };
          
          db.query('INSERT INTO products SET ?', sampleProduct, (err, result) => {
            if (err) {
              console.error('Error adding sample product:', err);
            } else {
              console.log('✅ Sample product added successfully');
            }
          });
        }
      });
    }
  });
};

// Export the function so it can be called from other files
module.exports = { createProductsTable };

// Run immediately if this file is executed directly
if (require.main === module) {
  createProductsTable();
  
  // Close connection after 2 seconds
  setTimeout(() => {
    console.log('🔚 Setup complete, closing connection...');
    process.exit(0);
  }, 2000);
}
