require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB (usar base de datos solartrack)
const mongoUri = process.env.MONGO_URI.includes('solartrack')
  ? process.env.MONGO_URI
  : process.env.MONGO_URI.replace(/(mongodb.*?)(\?|$)/, '$1solartrack$2');

mongoose.connect(mongoUri, {
  // useNewUrlParser y useUnifiedTopology ya no son necesarios en Mongoose 6+
})
.then(() => console.log('MongoDB conectado a la base de datos solartrack'))
.catch((err) => console.error('Error conectando a MongoDB:', err));

// Rutas
app.use('/api', require('./routes/auth'));
app.use('/api/exposures', require('./routes/exposures'));
app.use('/api/weather', require('./routes/weather'));

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API SolarTrack funcionando');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
}); 