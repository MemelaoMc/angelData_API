const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.l7der.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&ssl=true`;
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log('error db:', e))

// import routes
const authRoutes = require('./routes/auth');
const accounts = require('./routes/Accounts');

// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/v1', accounts);

// cors
const cors = require('cors');
var corsOptions = {
  origin: '*', // Reemplazar con dominio
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({
    estado: true,
    mensaje: 'funciona!'
  })
});

// server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`servidor andando en: ${PORT}`)
})