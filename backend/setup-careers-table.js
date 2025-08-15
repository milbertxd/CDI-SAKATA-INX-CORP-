const db = require('./db');

const createCareersTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS careers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      department VARCHAR(100) DEFAULT '',
      location VARCHAR(100) DEFAULT '',
      type VARCHAR(50) DEFAULT '',
      salary VARCHAR(100) DEFAULT '',
      level VARCHAR(50) DEFAULT '',
      category VARCHAR(50) DEFAULT '',
      description TEXT DEFAULT '',
      responsibilities JSON,
      requirements JSON,
      qualifications JSON,
      questions JSON,
      date_posted DATE DEFAULT NULL,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('❌ Error creating careers table:', err);
    } else {
      console.log('✅ Careers table created successfully');
      
      // Check if table is empty and add sample data
      db.query('SELECT COUNT(*) as count FROM careers', (err, results) => {
        if (err) {
          console.error('Error checking careers count:', err);
          return;
        }
        
        if (results[0].count === 0) {
          console.log('📝 Adding sample job posting...');
          const sampleJob = {
            title: 'Frontend Developer',
            department: 'Engineering',
            location: 'Remote',
            type: 'Full-time',
            salary: '$50,000 - $70,000',
            level: 'Mid-level',
            category: 'Engineering',
            description: 'We are looking for a skilled Frontend Developer to join our team.',
            responsibilities: JSON.stringify(['Develop user interfaces', 'Collaborate with designers', 'Write clean code']),
            requirements: JSON.stringify(['3+ years experience', 'React expertise', 'TypeScript knowledge']),
            qualifications: JSON.stringify(['Bachelor\'s degree preferred', 'Portfolio required']),
            questions: JSON.stringify(['Tell us about your React experience', 'What\'s your favorite CSS framework?']),
            date_posted: new Date().toISOString().split('T')[0],
            is_active: true
          };
          
          db.query('INSERT INTO careers SET ?', sampleJob, (err, result) => {
            if (err) {
              console.error('Error adding sample job:', err);
            } else {
              console.log('✅ Sample job posting added successfully');
            }
          });
        }
      });
    }
  });
};

// Export the function so it can be called from other files
module.exports = { createCareersTable };

// Run immediately if this file is executed directly
if (require.main === module) {
  createCareersTable();
  
  // Close connection after 2 seconds
  setTimeout(() => {
    console.log('🔚 Setup complete, closing connection...');
    process.exit(0);
  }, 2000);
}
