const mysql = require('mysql2');
const db = require('./db');

// Function to add TDS and SDS columns to products table
const addPdfColumnsToProductsTable = () => {
  console.log('🔄 Adding TDS and SDS columns to products table...');
  
  const sql = `
    ALTER TABLE products 
    ADD COLUMN tds_file VARCHAR(255) NULL AFTER image_url,
    ADD COLUMN sds_file VARCHAR(255) NULL AFTER tds_file;
  `;
  
  db.query(sql, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('✅ TDS and SDS columns already exist');
        return;
      }
      console.error('❌ Error adding TDS and SDS columns:', err);
      return;
    }
    console.log('✅ Successfully added TDS and SDS columns to products table');
  });
};

// Run the function
addPdfColumnsToProductsTable();

module.exports = { addPdfColumnsToProductsTable };