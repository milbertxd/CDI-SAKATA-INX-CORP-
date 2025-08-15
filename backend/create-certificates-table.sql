-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500) NOT NULL,
  full_document_url VARCHAR(500),
  certificate_type ENUM('ISO', 'HALAL', 'QUALITY', 'SAFETY', 'OTHER') DEFAULT 'OTHER',
  issue_date DATE,
  expiry_date DATE,
  issuing_authority VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default certificates
INSERT INTO certificates (title, description, image_url, full_document_url, certificate_type, issuing_authority, display_order) VALUES
('ISO 9001:2015 Certificate', 'ISO 9001:2015 Certified - Quality Management System certification ensuring consistent quality in our manufacturing processes.', '/socotec1.jpg', '/iso-pic.jpg', 'ISO', 'SOCOTEC', 1),
('Halal Certification', 'Halal Certified - Our products meet strict halal requirements, ensuring compliance with Islamic dietary laws.', '/halal.png', '/halah-pic.jpg', 'HALAL', 'Halal Certification Authority', 2);
