import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, BackHandler,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 


const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const rutUsuario = route.params.rutt;

   
    axios.get(`http://45.236.129.38:3000/api/User/${rutUsuario}`)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [route.params.usuario]);

  
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack(); 
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, [navigation]);
  

  return(
    <View style={{ flex: 1, backgroundColor: '#252A31' }}>
      <ScrollView style >
        <View style = {styles.relleno} >
        </View>
        <View style = {styles.container} >
          <Image source={require('./Logo.png')} style={styles.profileImage} />
          <Text style={styles.title}>Perfil del Usuario</Text>
          {user ? (
          <View style = {styles.container} > 
            <Text style={styles.fontPrimario}>{user.nombre}</Text>
            <View style = {styles.Bordes} >
              <Text style={styles.fontPrimario}>Documento de identidad RUN:</Text>
              <Text style = {styles.fontSecundario} >{user.rut}</Text>            
            </View>
            <View style = {styles.Bordes} >
              <Text style={styles.fontPrimario}>Direccion de correo electronico:</Text>
              <Text style ={styles.fontSecundario} >{user.correo}</Text>
            </View>
            <View style = {styles.Bordes} >
              <Text style={styles.userInfo}>Teléfono: {user.telefono}</Text>
            </View>
            {/* Agrega más campos aquí según tus necesidades */}
          </View>
        ) : (
          <Text style={styles.loadingText}>Cargando...</Text>
        )}
        </View>
      </ScrollView>
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
    marginTop: 20,
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
    fontWeight: 'bold'
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

  //Nuevos estilos
  profileImage:{
    width: 150,
    height: 150,
    borderRadius:100,
    marginTop: -70,
  },
  relleno: {
    padding: 10,
    backgroundColor: '#7F8F9F',
    height: 100
  },
  fontPrimario:{
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
    fontWeight:'bold'
  },
  fontSecundario:{
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  Bordes:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7F8F9F',
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20
  }

  // Agrega estilos adicionales según sea necesario
});

export default ProfileScreen;