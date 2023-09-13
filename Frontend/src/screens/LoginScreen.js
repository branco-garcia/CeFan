import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [rut, setRut] = useState('');
  const [contrasena, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.136:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut, contrasena }),
      });
  
      if (response.status === 200) {
        const data = await response.json(); // Parsea la respuesta JSON
        const nombreUsuario = data.nombre;
        const rutUsuario = data.rut; // Obtiene el nombre de usuario desde la respuesta
  
        navigation.navigate('Inicio', { nombre: nombreUsuario, rut:rutUsuario}); // Pasa el nombre como parámetro
        console.log(rutUsuario)
        console.log (nombreUsuario)
      } else {
        console.error('Error en el inicio de sesión');
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
});

export default LoginScreen;
