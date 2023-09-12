import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios'; // Asegúrate de importar Axios o la biblioteca que utilices para realizar solicitudes HTTP

const ProfileScreen = ({ route }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtén el nombre del usuario de la variable usuario
    const rutUsuario = route.params.rutt;

    // Realiza una solicitud GET al backend para obtener los valores del usuario por su nombre
    axios.get(`http://192.168.181.168:3000/api/User/${rutUsuario}`)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [route.params.usuario]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del Usuario</Text>
      {user ? (
        <View>
          <Text style={styles.userInfo}>Nombre: {user.nombre}</Text>
          <Text style={styles.userInfo}>Rut: {user.rut}</Text>
          <Text style={styles.userInfo}>Correo: {user.correo}</Text>
          <Text style={styles.userInfo}>Teléfono: {user.telefono}</Text>
          {/* Agrega más campos aquí según tus necesidades */}
        </View>
      ) : (
        <Text style={styles.loadingText}>Cargando...</Text>
      )}
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
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  // Agrega estilos adicionales según sea necesario
});

export default ProfileScreen;