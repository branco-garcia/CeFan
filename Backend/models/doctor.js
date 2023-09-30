const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  rut: String,
  nombre: String,
  especialidad: String,
});

module.exports = mongoose.model('Doctor', doctorSchema);
