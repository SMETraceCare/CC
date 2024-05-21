const express = require('express');
const router = express.Router();
const db = require('../db');

// Dapatkan semua suppliers
router.get('/', (req, res) => {
  db.query('SELECT * FROM Supplier', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Tambahkan supplier baru
router.post('/', (req, res) => {
  const { nama_supplier, deskripsi_supplier, alamat_supplier, lokasi_supplier, kontak_supplier, email_supplier, password_supplier } = req.body;
  db.query('INSERT INTO Supplier SET ?', { nama_supplier, deskripsi_supplier, alamat_supplier, lokasi_supplier, kontak_supplier, email_supplier, password_supplier }, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, ...req.body });
  });
});

module.exports = router;