-- Run this SQL command in your MySQL database to add the content field
-- You can run this through phpMyAdmin, MySQL Workbench, or command line

-- Add content field for rich article content
ALTER TABLE news ADD COLUMN content LONGTEXT AFTER summary;

-- Add other missing fields that might be needed
ALTER TABLE news ADD COLUMN categories VARCHAR(255) AFTER category;
ALTER TABLE news ADD COLUMN pdfUrl VARCHAR(500) AFTER categories;  
ALTER TABLE news ADD COLUMN isExternalLink BOOLEAN DEFAULT FALSE AFTER pdfUrl;
ALTER TABLE news ADD COLUMN isFeatured BOOLEAN DEFAULT FALSE AFTER isExternalLink;
