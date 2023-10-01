import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, BackHandler, Image, TextInput, ScrollView  } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Modal from 'react-native-modal'; 
import axios from 'axios';
import { styles } from '../styles/StyledHomeScreen';

import {
  evaluarIMC,
  calcularIMC,
  calcularTMB,
  calcularDiferenciaPesoIdeal,
} from '../components/calculosIMC'; 


const { height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;
  const route = useRoute();

  const [welcomeModalVisible, setWelcomeModalVisible] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const [usuario, setUsuario] = useState('');
  const [rutt, setRUT] = useState('');

  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [confirmedLogout, setConfirmedLogout] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    const nombreUsuario = route.params?.nombre;
    if (nombreUsuario) {
      setUsuario(nombreUsuario);
    }
    const rutUsuario = route.params?.rut;
    if (rutUsuario) {
      setRUT(rutUsuario);
    }
  }, [route.params]);
 

  useEffect(() => {
    calcularResultados();
  }, [userInfo]);
  

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleBackButton = () => {
    showLogoutModal(); 
    return true; 
  };

  const navigateToProfile = () => {
    toggleMenu();
    navigation.navigate('Perfil', { usuario, rutt });
  };

  const navigateToHorasMedicas = () => {
    toggleMenu();
    navigation.navigate('HorasMedicas', { usuario, rutt });
  };

  const navigateToMisHoras = () => {
    toggleMenu();
    navigation.navigate('MisHora', { usuario, rutt });
  };

  const navigateToEvolucion = () => {
    toggleMenu();
    navigation.navigate('Evolucion', { usuario, rutt });
  };

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };
  
  

  const hideLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  const confirmLogout = () => {
    setConfirmedLogout(true);
    hideLogoutModal();
  };

  useEffect(() => {
    
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (confirmedLogout) {
      navigation.navigate('Bienvenida'); 
    }
  }, [confirmedLogout]);

  const slideInStyle = {
    height: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [56, height],
    }),
    transform: [
      {
        translateY: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-height + 56, 0],
        }),
      },
    ],
    position: 'absolute', // Agregar posición absoluta
    top: 80,
  };

  const menuOptionsStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
    marginTop: 10,
    overflow: 'hidden',
    position: 'absolute', // Agregar posición absoluta
    zIndex: 1, // Establecer el valor de zIndex para controlar la superposición
  };
  
  const [editedUserInfo, setEditedUserInfo] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
  });
  const showEditModal = () => {
    setEditedUserInfo({
      weight: userInfo.weight,
      height: userInfo.height,
      age: userInfo.age,
      gender: userInfo.gender,
    });
    setIsEditModalVisible(true);
  };
  const saveChanges = async () => {
    try {
      if (!editedUserInfo.weight || !editedUserInfo.age || !editedUserInfo.height || !editedUserInfo.gender) {
        alert('Por favor, completa todos los campos.');
        return; 
      }

      const response = await fetch('http://45.236.129.38:3000/api/saveUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rut: rutt, 
          weight: editedUserInfo.weight,
          age: editedUserInfo.age,
          height: editedUserInfo.height,
          gender: editedUserInfo.gender,
        }),
      });
      console.log(rutt)
      console.log(editedUserInfo.weight)
  
      if (response.ok) {
        setUserInfo(editedUserInfo); 
        setIsEditModalVisible(false); 
      } else {
        alert('Hubo un error al guardar los datos en el servidor.');
      }
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error de red al intentar guardar los datos.');
    }
  };

  const [userInfo, setUserInfo] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
  });

  useEffect(() => {
    if (rutt) {
      axios
        .get(`http://45.236.129.38:3000/api/userData/${rutt}`)
        .then((response) => {
          if (response.status === 200 && response.data.userData) {
            setUserInfo(response.data.userData);
          } else {
            console.error('Datos de usuario no encontrados');
            
            alert('Datos de usuario no encontrados');
          }
        })
        .catch((error) => {
          
          
          setWelcomeMessage("Bienvenido a CeFan. Por favor, ingrese sus datos corporales.");
          setWelcomeModalVisible(true);
        });
    }
  }, [rutt]);
  
  useEffect(() => {
    if (userInfo && userInfo.weight && userInfo.height && userInfo.gender && userInfo.age) {
      calcularResultados(); 
    }
  }, [userInfo]);

  const [resultadoCalculo, setResultadoCalculo] = useState(null);

  const calcularResultados = () => {
   
  
    const peso = parseFloat(userInfo.weight);
    const alturaCm = parseFloat(userInfo.height);
    
    
    
  
    const imc = calcularIMC(peso, alturaCm);
    
    const genero = userInfo.gender.toLowerCase();
    const edad = parseInt(userInfo.age);
  
    
  
    const tmb = calcularTMB(peso, alturaCm, edad, genero);
    
    const diferenciaPesoIdeal = calcularDiferenciaPesoIdeal(peso, alturaCm);
  
    setResultadoCalculo({
      imc,
      evaluarIMC: evaluarIMC(imc),
      tmb: tmb !== null ? tmb.toFixed(2) : null,
      pesoIdeal: diferenciaPesoIdeal ? diferenciaPesoIdeal[0].toFixed(2) : null,
      diferenciaPesoIdeal: diferenciaPesoIdeal ? diferenciaPesoIdeal[1].toFixed(2) : null,
    });
  };
  
  



  return (
    <ScrollView>
    <View style={styles.container}>
      <Image source={require('../img/Logo.png')} style={styles.logoImage} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Bienvenido {usuario}</Text>
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>
          <View style={styles.dataSection}>
            <Text style={styles.dataTitle}>Peso:</Text>
            <Text style={styles.dataValue}>{userInfo.weight} kg</Text>
          </View>
          <View style={styles.dataSection}>
            <Text style={styles.dataTitle}>Edad:</Text>
            <Text style={styles.dataValue}>{userInfo.age} Años</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../img/imagenn.png')} style={styles.personImage} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>
          <View style={styles.dataSection}>
            <Text style={styles.dataTitle}>Altura:</Text>
            <Text style={styles.dataValue}>{userInfo.height} Cm</Text>
          </View>
          <View style={styles.dataSection}>
            <Text style={styles.dataTitle}>Género:</Text>
            <Text style={styles.dataValue}>{userInfo.gender}</Text>
          </View>
        </View>
      
      
      <TouchableOpacity style={styles.logoutButton} onPress={showLogoutModal}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.menuOptions, slideInStyle]}>
        <View style={styles.menuOptionContainer}>
          <TouchableOpacity style={styles.menuOption} onPress={navigateToProfile}>
            <Text style={styles.menuOptionText}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption} onPress={navigateToHorasMedicas}>
            <Text style={styles.menuOptionText}>Horas Medicas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption} onPress={navigateToMisHoras}>
            <Text style={styles.menuOptionText}>Mis Horas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption} onPress={navigateToEvolucion}>
            <Text style={styles.menuOptionText}>Evolucion Medica</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

<TouchableOpacity style={styles.editButton} onPress={showEditModal}>
  <Text style={styles.editButtonText}>Editar Datos</Text>
</TouchableOpacity>

<Modal isVisible={isEditModalVisible}>
  <View style={styles.editModal}>
    <Text style={styles.editModalTitle}>Editar Datos</Text>
    <TextInput
      style={styles.editModalInput}
      placeholder="Peso"
      value={editedUserInfo.weight}
      onChangeText={(text) => setEditedUserInfo({ ...editedUserInfo, weight: text })}
    />
    <TextInput
      style={styles.editModalInput}
      placeholder="Altura"
      value={editedUserInfo.height}
      onChangeText={(text) => setEditedUserInfo({ ...editedUserInfo, height: text })}
    />
    <TextInput
      style={styles.editModalInput}
      placeholder="Edad"
      value={editedUserInfo.age}
      onChangeText={(text) => setEditedUserInfo({ ...editedUserInfo, age: text })}
    />
    <TextInput
      style={styles.editModalInput}
      placeholder="Género"
      value={editedUserInfo.gender}
      onChangeText={(text) => setEditedUserInfo({ ...editedUserInfo, gender: text })}
    />
    <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
      <Text style={styles.saveButtonText}>Guardar</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditModalVisible(false)}>
      <Text style={styles.cancelButtonText}>Cancelar</Text>
    </TouchableOpacity>
  </View>
</Modal>

{/* Calculadora */}
<Text style={styles.calculadoraIMCText}>Calculadora IMC</Text>

<View style={styles.resultadosContainer}>
        {resultadoCalculo && (
          <>
            <View style={styles.resultadoItem}>
            <Text style={{...styles.resultadoTexto, textAlign: 'center', fontSize: 22,fontWeight: 'bold',}}>Resultado</Text>
              <Text style = {styles.resultadoTexto}>Indice de Masa Corporal:</Text>
              <Text style = {[styles.containerResult, { color: 'black' }]}> {resultadoCalculo.imc} IMC</Text>
            </View>

            <View style={styles.resultadoItem}>
              <Text style={styles.resultadoTexto}>Clasificación IMC:</Text>
              <Text style = {[styles.containerResult, { color: 'black' }]}>{resultadoCalculo.evaluarIMC}</Text>
            </View>

            <View style={styles.resultadoItem}>
              {/* TMB */}
              <Text style={styles.resultadoTexto}>Tasa de Metabolismo Basal:</Text>
              <Text style = {[styles.containerResult, { color: 'black' }]}>{resultadoCalculo.tmb} Calorias</Text>
            </View>

            <View style={styles.resultadoItem}>
              <Text style={styles.resultadoTexto}>Peso Ideal:</Text>
              <Text style = {[styles.containerResult, { color: 'black' }]}>{resultadoCalculo.pesoIdeal} Kg</Text>
            </View>

            <View style={styles.resultadoItem}>
              <Text style={styles.resultadoTexto}>Diferencia de Peso Ideal:</Text>
              <Text style={[styles.containerResult, { color: 'black' }]}>{resultadoCalculo.diferenciaPesoIdeal} kg</Text>
            </View>
          </>
        )}
      </View>

      <Modal isVisible={welcomeModalVisible}>
       <View style={styles.logoutModal}>
            <Text style={styles.logoutModalText}>{welcomeMessage}</Text>
            <TouchableOpacity style={styles.logoutModalButton} onPress={() => setWelcomeModalVisible(false)}>
              <Text style={styles.logoutModalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>



      <Modal isVisible={isLogoutModalVisible}>
        <View style={styles.logoutModal}>
          <Text style={styles.logoutModalText}>¿Estás seguro de que quieres cerrar sesión?</Text>
          <TouchableOpacity style={styles.logoutModalButton} onPress={confirmLogout}>
            <Text style={styles.logoutModalButtonText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutModalButton} onPress={hideLogoutModal}>
            <Text style={styles.logoutModalButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    </ScrollView>
  );
};



export default HomeScreen;