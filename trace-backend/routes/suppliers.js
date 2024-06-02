const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config();

// Middleware for token verification
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({ error: true, message: 'No token provided.' });

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ error: true, message: 'Failed to authenticate token.' });
        req.userId = decoded.userId;
        next();
    });
};

// Get Supplier Profile
router.get('/:id', verifyToken, (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM Supplier WHERE supplier_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: true, message: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: true, message: 'Supplier not found' });
        }

        const supplier = results[0];

        db.query('SELECT email FROM Auth WHERE user_id = ? AND user_type = "supplier"', [id], (err, authResults) => {
            if (err) {
                return res.status(500).json({ error: true, message: err.message });
            }

            const email = authResults[0].email;

            res.json({
                error: false,
                message: 'success',
                result: {
                    userId: `user-${supplier.supplier_id}`,
                    name: supplier.nama_supplier,
                    email: email,
                    description: supplier.deskripsi_supplier,
                    address: supplier.alamat_supplier,
                    phoneNumber: supplier.kontak_supplier
                }
            });
        });
    });
});


// Create Supplier
router.post('/', (req, res) => {
    const { nama_supplier, deskripsi_supplier, alamat_supplier, kontak_supplier } = req.body;

    db.query('INSERT INTO Supplier (nama_supplier, deskripsi_supplier, alamat_supplier, kontak_supplier) VALUES (?, ?, ?, ?)', 
    [nama_supplier, deskripsi_supplier, alamat_supplier, kontak_supplier], (err, result) => {
        if (err) {
            return res.status(500).json({ error: true, message: err.message });
        }

        res.json({
            error: false,
            message: 'Supplier created successfully',
            result: { supplier_id: result.insertId }
        });
    });
});

// Update Supplier
router.put('/:id', verifyToken, upload.none(), (req, res) => {
    const { id } = req.params;
    const { name, email, description, address, phoneNumber } = req.body;

    if (phoneNumber.length < 12 || phoneNumber.length > 20) {
        return res.status(400).json({ error: true, message: 'phoneNumber must be at least 12 characters, max 20 characters' });
    }

    db.query('UPDATE Supplier SET nama_supplier = ?, deskripsi_supplier = ?, alamat_supplier = ?, kontak_supplier = ? WHERE supplier_id = ?',
        [name, description, address, phoneNumber, id], (err) => {
            if (err) {
                return res.status(500).json({ error: true, message: err.message });
            }

            db.query('UPDATE Auth SET email = ? WHERE user_id = ? AND user_type = "supplier"', [email, id], (err) => {
                if (err) {
                    return res.status(500).json({ error: true, message: err.message });
                }

                res.json({ error: false, message: 'Success Update Profile Supplier' });
            });
        });
});


// Delete Supplier
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM Supplier WHERE supplier_id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: true, message: err.message });
        }

        res.json({
            error: false,
            message: 'Supplier deleted successfully'
        });
    });
});

module.exports = router;