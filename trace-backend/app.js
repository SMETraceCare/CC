const express = require('express');
const db = require('./db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const suppliersRouter = require('./routes/suppliers');
const umkmsRouter = require('./routes/umkm');
const profilPembatikRouter = require('./routes/profil_pembatik');
const barangMentahRouter = require('./routes/barang_mentah');
const productsRouter = require('./routes/products');
const qrCodesRouter = require('./routes/qr_codes'); 

app.use('/suppliers', suppliersRouter);
app.use('/umkm', umkmsRouter);
app.use('/profil_pembatik', profilPembatikRouter);
app.use('/barang_mentah', barangMentahRouter);
app.use('/products', productsRouter);
app.use('/qr_codes', qrCodesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});