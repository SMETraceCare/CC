const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all UMKMs
router.get('/', (req, res) => {
  db.query('SELECT * FROM UMKM', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get a specific UMKM
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM UMKM WHERE umkm_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

// Create a new UMKM
router.post('/', (req, res) => {
  const { nama_umkm, deskripsi_umkm, alamat_umkm, kontak_umkm, email_umkm, password_umkm } = req.body;
  db.query('INSERT INTO UMKM SET ?', { nama_umkm, deskripsi_umkm, alamat_umkm, kontak_umkm, email_umkm, password_umkm }, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, ...req.body });
  });
});

// Update a UMKM
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nama_umkm, deskripsi_umkm, alamat_umkm, kontak_umkm, email_umkm, password_umkm } = req.body;
  db.query('UPDATE UMKM SET ? WHERE umkm_id = ?', [{ nama_umkm, deskripsi_umkm, alamat_umkm, kontak_umkm, email_umkm, password_umkm }, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id, ...req.body });
  });
});

// Delete a UMKM
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM UMKM WHERE umkm_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'UMKM deleted successfully' });
  });
});

module.exports = router;