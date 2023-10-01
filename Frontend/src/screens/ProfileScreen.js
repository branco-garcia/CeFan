import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, BackHandler,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 
import { styles } from '../styles/StyledProfile';

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
          <Image source={require('../img/Logo.png')} style={styles.profileImage} />
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

export default ProfileScreen;