const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  rut: String,
  correo: String,
});

module.exports = mongoose.model('Usuario', userSchema); // Asegúrate de que el nombre del modelo coincida con el de la colección en MongoDB
