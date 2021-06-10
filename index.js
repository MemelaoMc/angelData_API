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
app.use('/api/v1/user', authRoutes);
app.use('/api/v1', accounts);

// cors
let allowedOrigins = ['http://localhost:3000',
  'https://modest-aryabhata-c37ede.netlify.app'];

const cors = require('cors');
var corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }, // Reemplazar con dominio
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.get('/', (req, res) => res.send('Working!!!'));

// server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
})