const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all raw materials
router.get('/', (req, res) => {
  db.query('SELECT * FROM Barang_Mentah', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get a specific raw material
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Barang_Mentah WHERE barang_mentah_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

// Create a new raw material
router.post('/', (req, res) => {
  const { nama_barang_mentah, jenis_barang_mentah, asal_barang_mentah, karakteristik_barang_mentah, supplier_id } = req.body;
  db.query('INSERT INTO Barang_Mentah SET ?', { nama_barang_mentah, jenis_barang_mentah, asal_barang_mentah, karakteristik_barang_mentah, supplier_id }, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, ...req.body });
  });
});

// Update a raw material
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nama_barang_mentah, jenis_barang_mentah, asal_barang_mentah, karakteristik_barang_mentah, supplier_id } = req.body;
  db.query('UPDATE Barang_Mentah SET ? WHERE barang_mentah_id = ?', [{ nama_barang_mentah, jenis_barang_mentah, asal_barang_mentah, karakteristik_barang_mentah, supplier_id }, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id, ...req.body });
  });
});

// Delete a raw material
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Barang_Mentah WHERE barang_mentah_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Raw material deleted successfully' });
  });
});

module.exports = router;