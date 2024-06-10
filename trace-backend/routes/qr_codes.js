const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const QRCode = require('qrcode');
const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Configure Google Cloud Storage
const storage = new Storage({
    keyFilename: process.env.GCLOUD_KEY_FILE, // Path to your service account key file
    projectId: process.env.GCLOUD_PROJECT_ID
});

const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

// Generate QR code for a product
router.post('/generate', (req, res) => {
    const { produk_id } = req.body;

    // Get product details from the database
    db.query('SELECT * FROM Produk_Batik WHERE produk_id = ?', [produk_id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(404).send('Product not found');
        }

        const product = result[0];
        const qrData = `${process.env.APP_URL}/products/${product.produk_id}`;

        // Generate QR code
        QRCode.toDataURL(qrData, (err, url) => {
            if (err) throw err;

            // Convert base64 to buffer
            const base64Data = url.replace(/^data:image\/png;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');

            // Set GCS file name
            const gcsFileName = `qrcodes/${uuidv4()}.png`;

            // Create a file object and upload buffer to GCS
            const file = bucket.file(gcsFileName);
            const stream = file.createWriteStream({
                metadata: {
                    contentType: 'image/png',
                }
            });

            stream.on('error', (err) => {
                console.error('Error uploading to GCS:', err);
                res.status(500).send('Error uploading to GCS');
            });

            stream.on('finish', () => {
                // Make the file publicly accessible (optional)
                file.makePublic().then(() => {
                    const qrCodeUrl = `https://storage.googleapis.com/${process.env.GCLOUD_BUCKET_NAME}/${gcsFileName}`;

                    // Save QR code URL to the database
                    db.query('INSERT INTO QR_Code (kode_qr, produk_id) VALUES (?, ?)', [qrCodeUrl, produk_id], (err, result) => {
                        if (err) throw err;
                        res.json({ qr_code: qrCodeUrl });
                    });
                });
            });

            // Write buffer to the file stream
            stream.end(buffer);
        });
    });
});

// Get product details by QR code
router.get('/scan/:qr_id', (req, res) => {
    const { qr_id } = req.params;

    db.query('SELECT * FROM QR_Code WHERE qr_id = ?', [qr_id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(404).send('QR code not found');
        }

        const qrCode = result[0];

        db.query('SELECT * FROM Produk_Batik WHERE produk_id = ?', [qrCode.produk_id], (err, productResult) => {
            if (err) throw err;
            if (productResult.length === 0) {
                return res.status(404).send('Product not found');
            }

            const product = productResult[0];
            res.json(product);
        });
    });
});

module.exports = router;