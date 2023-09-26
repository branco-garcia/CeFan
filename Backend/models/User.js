const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  rut: String,
  correo: String,
  telefono: String,
  contrasena: String,
});

module.exports = mongoose.model('Usuario', userSchema);
