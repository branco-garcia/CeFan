import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from '../styles/StyledLogin';

const LoginScreen = ({ navigation }) => {
  const [rut, setRut] = useState('');
  const [contrasena, setPassword] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = async () => {
    try {
      const response = await fetch('http://45.236.129.38:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut, contrasena }),
      });
  
      if (response.status === 200) {
        // Inicio de sesión exitoso
        const data = await response.json();
        const nombreUsuario = data.nombre;
        const rutUsuario = data.rut;
        navigation.navigate('Inicio', { nombre: nombreUsuario, rut: rutUsuario });
      } else {
        setErrorModalVisible(true);
        setErrorMessage('Credenciales incorrectas. Inténtelo de nuevo.');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../img/Logo.png')} style={styles.logoImage} />
        </View>
        <Text style={styles.title}>Inicio de Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="RUT"
          placeholderTextColor="#EEEEEE"
          value={rut}
          onChangeText={setRut}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#EEEEEE"
          secureTextEntry={true}
          value={contrasena}
          onChangeText={setPassword}
        />
        <Button
          title="Iniciar Sesión"
          onPress={handleLogin}
          color="#00ADB5"
        />

        <Modal
          visible={errorModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setErrorModalVisible(false)}
        >
          <View style={styles.errorModal}>
            <View style={styles.errorModalContent}>
              <Text style={styles.errorText}>{errorMessage}</Text>
              <TouchableOpacity
                style={styles.errorButton}
                onPress={() => setErrorModalVisible(false)}
              >
                <Text style={styles.errorButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
            <Text style={styles.registerLink}>Regístrate aquí</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};



export default LoginScreen;