const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all products
router.get('/', (req, res) => {
  db.query('SELECT * FROM Produk_Batik', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get a specific product
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Produk_Batik WHERE produk_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

// Get product origin details
router.get('/origin/:id', (req, res) => {
  const { id } = req.params;
  db.query(`
    SELECT p.*, s.nama_supplier, s.deskripsi_supplier, s.alamat_supplier, 
           s.lokasi_supplier, u.nama_umkm, u.deskripsi_umkm, u.alamat_umkm,
           b.nama_barang_mentah, b.jenis_barang_mentah, b.asal_barang_mentah
    FROM Produk_Batik p
    JOIN Supplier s ON p.supplier_id = s.supplier_id
    JOIN UMKM u ON p.umkm_id = u.umkm_id
    JOIN Barang_Mentah b ON p.barang_mentah = b.barang_mentah_id
    WHERE p.produk_id = ?
  `, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

// Get product details by QR code
router.get('/qr/:code', (req, res) => {
  const { code } = req.params;
  db.query(`
    SELECT p.*, s.nama_supplier, s.deskripsi_supplier, s.alamat_supplier, 
           s.lokasi_supplier, u.nama_umkm, u.deskripsi_umkm, u.alamat_umkm,
           b.nama_barang_mentah, b.jenis_barang_mentah, b.asal_barang_mentah,
           q.kode_qr
    FROM Produk_Batik p
    JOIN Supplier s ON p.supplier_id = s.supplier_id
    JOIN UMKM u ON p.umkm_id = u.umkm_id
    JOIN Barang_Mentah b ON p.barang_mentah = b.barang_mentah_id
    JOIN QR_Code q ON p.produk_id = q.produk_id
    WHERE q.kode_qr = ?
  `, [code], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

// Create Product
router.post('/', (req, res) => {
  const { nama_produk, deskripsi_produk, harga_produk, foto_produk, umkm_id, supplier_id, barang_mentah_id } = req.body;

  db.query('INSERT INTO Produk_Batik (nama_produk, deskripsi_produk, harga_produk, foto_produk, umkm_id, supplier_id, barang_mentah) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nama_produk, deskripsi_produk, harga_produk, foto_produk, umkm_id, supplier_id, barang_mentah_id], (err, result) => {
          if (err) {
              return res.status(500).json({ error: true, message: err.message });
          }
          res.json({ error: false, message: 'Product created successfully', productId: result.insertId });
      });
});

// Read all Products
router.get('/', (req, res) => {
  db.query('SELECT * FROM Produk_Batik', (err, results) => {
      if (err) {
          return res.status(500).json({ error: true, message: err.message });
      }
      res.json({ error: false, message: 'success', results });
  });
});

// Read single Product
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM Produk_Batik WHERE produk_id = ?', [id], (err, results) => {
      if (err) {
          return res.status(500).json({ error: true, message: err.message });
      }
      if (results.length === 0) {
          return res.status(404).json({ error: true, message: 'Product not found' });
      }
      res.json({ error: false, message: 'success', result: results[0] });
  });
});

// Update Product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nama_produk, deskripsi_produk, harga_produk, foto_produk, umkm_id, supplier_id, barang_mentah_id } = req.body;

  db.query('UPDATE Produk_Batik SET nama_produk = ?, deskripsi_produk = ?, harga_produk = ?, foto_produk = ?, umkm_id = ?, supplier_id = ?, barang_mentah = ? WHERE produk_id = ?',
      [nama_produk, deskripsi_produk, harga_produk, foto_produk, umkm_id, supplier_id, barang_mentah_id, id], (err) => {
          if (err) {
              return res.status(500).json({ error: true, message: err.message });
          }
          res.json({ error: false, message: 'Product updated successfully' });
      });
});

// Delete Product
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Produk_Batik WHERE produk_id = ?', [id], (err) => {
      if (err) {
          return res.status(500).json({ error: true, message: err.message });
      }
      res.json({ error: false, message: 'Product deleted successfully' });
  });
});

module.exports = router;