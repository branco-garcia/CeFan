const mongoose = require('mongoose');

const mongoURI = 'mongodb://branco:1234@45.236.129.38:27017'; // Coloca aquí tu URI de MongoDB

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

module.exports = mongoose;
