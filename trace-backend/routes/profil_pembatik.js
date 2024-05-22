const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all profiles
router.get('/', (req, res) => {
  db.query('SELECT * FROM Profil_Pembatik', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get a specific profile
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Profil_Pembatik WHERE pembatik_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

// Create a new profile
router.post('/', (req, res) => {
  const { nama_pembatik, foto_pembatik, tanggal_mulai, umkm_id } = req.body;
  db.query('INSERT INTO Profil_Pembatik SET ?', { nama_pembatik, foto_pembatik, tanggal_mulai, umkm_id }, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, ...req.body });
  });
});

// Update a profile
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nama_pembatik, foto_pembatik, tanggal_mulai, umkm_id } = req.body;
  db.query('UPDATE Profil_Pembatik SET ? WHERE pembatik_id = ?', [{ nama_pembatik, foto_pembatik, tanggal_mulai, umkm_id }, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id, ...req.body });
  });
});

// Delete a profile
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Profil_Pembatik WHERE pembatik_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Profile deleted successfully' });
  });
});

module.exports = router;