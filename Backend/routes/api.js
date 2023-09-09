const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { nombre, rut, correo } = req.body;
    const user = new User({ nombre, rut, correo });

    // Guarda el usuario en la base de datos
    await user.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

module.exports = router;
