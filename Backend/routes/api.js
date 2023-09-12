const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { nombre, rut, correo, telefono, contrasena } = req.body; // Agrega los campos de telefono y contrasena
    const user = new User({ nombre, rut, correo, telefono, contrasena }); // Incluye los nuevos campos en el usuario

    // Guarda el usuario en la base de datos
    await user.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { rut, contrasena } = req.body;
    const user = await User.findOne({ rut, contrasena });
    if (user) {
      res.status(200).json({ message: 'Inicio de sesión exitoso', rut: user.rut ,nombre: user.nombre });

    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el inicio de sesión' });
  }
});

router.get('/User/:rut', async (req, res) => {
  try {
    const rut = req.params.rut;
    const user = await User.findOne({ rut });

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
});

module.exports = router;