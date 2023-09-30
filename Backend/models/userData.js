const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
  rut: String,
  weight: String, 
  age: String,
  height: String, 
  gender: String, 
});

module.exports = mongoose.model('UserData', userDataSchema);