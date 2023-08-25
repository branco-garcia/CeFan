import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
const RegisterScreen = () => {
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [cargo, setCargo] = useState('');
  const [correo, setCorreo] = useState('');

  const cargoOptions = ['medico', 'administrador', 'paciente'];

  const handleRegister = () => {
    // Implementa la lógica para enviar los datos de registro al servidor
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('./EcoFanLogo.png')} style={styles.logoImage} />
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
        <Picker
          style={styles.input}
          selectedValue={cargo}
          onValueChange={(itemValue) => setCargo(itemValue)}
        >
          <Picker.Item label="Selecciona un cargo" value="" />
          {cargoOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
        <Button
          title="Registrarse"
          onPress={handleRegister}
          color="#00ADB5"
        />
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
});

export default RegisterScreen;
