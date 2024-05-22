const express = require('express');
const router = express.Router();
const db = require('../db');

<<<<<<< HEAD
// Get all suppliers
=======
// Dapatkan semua suppliers
>>>>>>> 0798d49ca19dc8dbe01b5fb489bf120473fef254
router.get('/', (req, res) => {
  db.query('SELECT * FROM Supplier', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

<<<<<<< HEAD
// Get a specific supplier
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Supplier WHERE supplier_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

// Create a new supplier
=======
// Tambahkan supplier baru
>>>>>>> 0798d49ca19dc8dbe01b5fb489bf120473fef254
router.post('/', (req, res) => {
  const { nama_supplier, deskripsi_supplier, alamat_supplier, lokasi_supplier, kontak_supplier, email_supplier, password_supplier } = req.body;
  db.query('INSERT INTO Supplier SET ?', { nama_supplier, deskripsi_supplier, alamat_supplier, lokasi_supplier, kontak_supplier, email_supplier, password_supplier }, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, ...req.body });
  });
});

<<<<<<< HEAD
// Update a supplier
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nama_supplier, deskripsi_supplier, alamat_supplier, lokasi_supplier, kontak_supplier, email_supplier, password_supplier } = req.body;
  db.query('UPDATE Supplier SET ? WHERE supplier_id = ?', [{ nama_supplier, deskripsi_supplier, alamat_supplier, lokasi_supplier, kontak_supplier, email_supplier, password_supplier }, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id, ...req.body });
  });
});

// Delete a supplier
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Supplier WHERE supplier_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Supplier deleted successfully' });
  });
});

=======
>>>>>>> 0798d49ca19dc8dbe01b5fb489bf120473fef254
module.exports = router;