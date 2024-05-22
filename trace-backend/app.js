const express = require('express');
<<<<<<< HEAD
const db = require('./db');
=======
const mysql = require('mysql');
>>>>>>> 0798d49ca19dc8dbe01b5fb489bf120473fef254
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

<<<<<<< HEAD
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
=======
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

app.use(express.json());

const suppliersRouter = require('./routes/suppliers');


app.use('/api/suppliers', suppliersRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
>>>>>>> 0798d49ca19dc8dbe01b5fb489bf120473fef254
});