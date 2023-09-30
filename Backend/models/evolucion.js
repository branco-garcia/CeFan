const mongoose = require('mongoose');

const evolucionSchema = new mongoose.Schema({
  doctor: String,        
  hora: String,          
  especialista: String,
  notas: String,  
  medicamentos: String,  
  pacienteRut: String, 
});

module.exports = mongoose.model('Evolucion', evolucionSchema);