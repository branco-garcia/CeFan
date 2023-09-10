import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import axios from 'axios';

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
      const response = await axios.post('http://192.168.1.13:3000/api/register', {
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
          <Image source={require('./Logo.png')} style={styles.logoImage} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#252A31',
  },
  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#393E46',
    borderRadius: 10,
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'transparent',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 90,
    height: 90,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#00ADB5',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#222831',
    borderRadius: 5,
    color: '#EEEEEE',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalClose: {
    fontSize: 16,
    color: '#00ADB5',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default RegisterScreen;
