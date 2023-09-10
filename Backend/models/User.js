const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  rut: String,
  correo: String,
  telefono: String, // Agrega el campo de número de teléfono
  contrasena: String, // Agrega el campo de contraseña
});

module.exports = mongoose.model('Usuario', userSchema);

