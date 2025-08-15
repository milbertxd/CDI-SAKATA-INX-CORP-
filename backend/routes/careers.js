const express = require('express');
const router = express.Router();
const db = require('../db');

// 📍 GET all careers/jobs
router.get('/', (req, res) => {
  db.query('SELECT * FROM careers ORDER BY date_posted DESC, id DESC', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      // Parse JSON fields
      results.forEach(job => {
        ['responsibilities', 'requirements', 'qualifications', 'questions'].forEach(field => {
          if (job[field]) {
            try { job[field] = JSON.parse(job[field]); }
            catch { job[field] = []; }
          } else {
            job[field] = [];
          }
        });
      });
      res.json(results);
    }
  });
});

// 📍 GET one job by id
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM careers WHERE id = ?', [req.params.id], (err, results) => {
    if (err || results.length === 0) {
      res.status(404).json({ error: 'Job not found' });
    } else {
      const job = results[0];
      ['responsibilities', 'requirements', 'qualifications', 'questions'].forEach(field => {
        if (job[field]) {
          try { job[field] = JSON.parse(job[field]); }
          catch { job[field] = []; }
        } else {
          job[field] = [];
        }
      });
      res.json(job);
    }
  });
});

// 📍 POST new job (now with category)
router.post('/', (req, res) => {
  const {
    title, department, location, type, salary, level, category, description,
    responsibilities, requirements, qualifications, questions, date_posted
  } = req.body;
  
  db.query(
    `INSERT INTO careers (title, department, location, type, salary, level, category, description, responsibilities, requirements, qualifications, questions, date_posted)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title, department, location, type, salary, level, category, description,
      JSON.stringify(responsibilities), JSON.stringify(requirements),
      JSON.stringify(qualifications), JSON.stringify(questions),
      date_posted || new Date()
    ],
    (err, result) => {
      if (err) {
        console.error('Insert error:', err);
        res.status(500).json({ error: 'Insert error' });
      } else {
        res.json({ id: result.insertId, ...req.body });
      }
    }
  );
});

// 📍 PUT update job (now with category)
router.put('/:id', (req, res) => {
  console.log('PUT request received for ID:', req.params.id);
  console.log('Request body:', req.body);
  
  const {
    title, department, location, type, salary, level, category, description,
    responsibilities, requirements, qualifications, questions, date_posted
  } = req.body;
  
  console.log('Extracted category:', category);
  
  db.query(
    `UPDATE careers SET title=?, department=?, location=?, type=?, salary=?, level=?, category=?, description=?, responsibilities=?, requirements=?, qualifications=?, questions=?, date_posted=?
     WHERE id=?`,
    [
      title, department, location, type, salary, level, category, description,
      JSON.stringify(responsibilities), JSON.stringify(requirements),
      JSON.stringify(qualifications), JSON.stringify(questions),
      date_posted, req.params.id
    ],
    (err, result) => {
      if (err) {
        console.error('Database update error:', err);
        res.status(500).json({ error: 'Update error', details: err.message });
      } else if (result.affectedRows === 0) {
        console.log('No rows affected - job not found');
        res.status(404).json({ error: 'Job not found' });
      } else {
        console.log('Update successful, affected rows:', result.affectedRows);
        res.json({ success: true, id: req.params.id, ...req.body });
      }
    }
  );
});

// 📍 DELETE job
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM careers WHERE id = ?', [req.params.id], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      res.status(500).json({ error: 'Delete error' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Job not found' });
    } else {
      res.json({ success: true, message: 'Job deleted successfully' });
    }
  });
});

module.exports = router;