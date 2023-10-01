import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { styles } from '../styles/StyledRegister';

import RNModal from 'react-native-modal'; // Cambia el nombre de la importación a RNModal

const RegisterScreen = () => {
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState(''); // Nuevo estado para el número de teléfono
  const [contrasena, setContrasena] = useState(''); // Nuevo estado para la contraseña
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://45.236.129.38:3000/api/register', {
        nombre,
        rut,
        correo,
        telefono, 
        contrasena, 
      });

      if (response.status === 201) {
        setIsSuccessModalVisible(true);
      } else {
        console.error('Error en el registro:', response.data);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../img/Logo.png')} style={styles.logoImage} />
        </View>
        <Text style={styles.title}>Registro de Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#EEEEEE"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="RUT"
          placeholderTextColor="#EEEEEE"
          value={rut}
          onChangeText={setRut}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          placeholderTextColor="#EEEEEE"
          value={correo}
          onChangeText={setCorreo}
        />
        <TextInput
          style={styles.input}
          placeholder="Número de Teléfono" // Campo para el número de teléfono
          placeholderTextColor="#EEEEEE"
          value={telefono}
          onChangeText={setTelefono}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña" // Campo para la contraseña
          placeholderTextColor="#EEEEEE"
          secureTextEntry={true}
          value={contrasena}
          onChangeText={setContrasena}
        />

        <Button
          title="Registrarse"
          onPress={handleRegister}
          color="#00ADB5"
        />
      </View>

      <RNModal isVisible={isSuccessModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Registro Exitoso</Text>
          
          <Text style={styles.modalClose} onPress={() => setIsSuccessModalVisible(false)}>Cerrar</Text>
          
        </View>
      </RNModal>
    </View>
  );
};


export default RegisterScreen;