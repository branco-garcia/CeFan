import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const LoginScreen = ({ navigation }) => {
  const [rut, setRut] = useState('');
  const [contrasena, setPassword] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.45.168:3000/api/login', {
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
          <Image source={require('./Logo.png')} style={styles.logoImage} />
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
  registerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    color: '#EEEEEE',
  },
  registerLink: {
    color: '#00ADB5',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  errorModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  errorModalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
  },
  errorButton: {
    backgroundColor: '#00ADB5',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  },
  errorButtonText: {
    fontSize: 18,
    color: 'white',
  },
  
  
});

export default LoginScreen;