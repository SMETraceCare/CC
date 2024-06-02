const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./db');
require('dotenv').config();

const productsRouter = require('./routes/products');
const suppliersRouter = require('./routes/suppliers');
const umkmRouter = require('./routes/umkm');
const profilPembatikRouter = require('./routes/profil_pembatik');
const barangMentahRouter = require('./routes/barang_mentah');
const authRouter = require('./routes/auth');
//const qrCodeRouter = require('./routes/qr_codes');

app.use(bodyParser.json());
app.use('/products', productsRouter);
app.use('/suppliers', suppliersRouter);
app.use('/umkm', umkmRouter);
app.use('/profil_pembatik', profilPembatikRouter);
app.use('/barang_mentah', barangMentahRouter);
app.use('/auth', authRouter);
//app.use('/qr_codes', qrCodeRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
