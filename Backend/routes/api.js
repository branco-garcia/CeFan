const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserData = require('../models/userData');
const Cita = require('../models/cita');


router.post('/register', async (req, res) => {
  try {
    const { nombre, rut, correo, telefono, contrasena } = req.body; 
    const user = new User({ nombre, rut, correo, telefono, contrasena }); 
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

router.post('/saveUserData', async (req, res) => {
  try {
    const { rut, weight, age, height, gender } = req.body;

    const existingUserData = await UserData.findOne({ rut });

    if (existingUserData) {
      existingUserData.weight = weight;
      existingUserData.age = age;
      existingUserData.height = height;
      existingUserData.gender = gender;
      await existingUserData.save();
      res.status(200).json({ message: 'Datos del usuario actualizados con éxito' });
    } else {
      const userData = new UserData({ rut, weight, age, height, gender });
      await userData.save();
      res.status(201).json({ message: 'Datos del usuario guardados con éxito' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al guardar o actualizar los datos del usuario' });
  }
});


router.get('/citas/disponibles', async (req, res) => {
  try {
    const citasDisponibles = await Cita.find({ disponible: true });
    res.status(200).json({ citas: citasDisponibles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener citas disponibles' });
  }
});


router.post('/citas/reservar', async (req, res) => {
  try {
    const { citaId, pacienteId } = req.body;
    console.log(pacienteId)
    console.log(citaId)
    const cita = await Cita.findById(citaId);
    
    if (!cita || !cita.disponible) {
      res.status(400).json({ message: 'La cita no está disponible para reserva' });
      return;
    }
   

    cita.reservada = true;
    cita.pacienteRut = pacienteId;
    cita.disponible = false;
    await cita.save();

    res.status(200).json({ message: 'Cita reservada con éxito' });
  } catch (error) {
    console.error('Error al reservar la cita:', error);
    res.status(500).json({ message: 'Error interno al reservar la cita' });
  }
});





module.exports = router;