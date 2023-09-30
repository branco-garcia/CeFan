const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor: String,
  especialidad: String,
  fecha: Date,
  disponible: Boolean,
  reservada: Boolean, 
  pacienteRut: String, 
  
});

module.exports = mongoose.model('Cita', appointmentSchema);