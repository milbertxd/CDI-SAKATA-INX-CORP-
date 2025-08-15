const db = require('./db');
const { setupCertificatesTable } = require('./setup-certificates');

console.log('🚀 Setting up certificates database...');

// Setup certificates table and data
setupCertificatesTable();

// Keep the script running for a moment to see all output
setTimeout(() => {
  console.log('✅ Database setup complete!');
  console.log('🔗 You can now start your server with: node index.js');
  process.exit(0);
}, 2000);
