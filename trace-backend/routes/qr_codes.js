const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all QR codes
router.get('/', (req, res) => {
  db.query('SELECT * FROM QR_Code', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get a specific QR code
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM QR_Code WHERE qr_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

// Create a new QR code
router.post('/', (req, res) => {
  const { kode_qr, produk_id } = req.body;
  db.query('INSERT INTO QR_Code SET ?', { kode_qr, produk_id }, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, ...req.body });
  });
});

// Update a QR code
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { kode_qr, produk_id } = req.body;
  db.query('UPDATE QR_Code SET ? WHERE qr_id = ?', [{ kode_qr, produk_id }, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id, ...req.body });
  });
});

// Delete a QR code
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM QR_Code WHERE qr_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'QR Code deleted successfully' });
  });
});

module.exports = router;