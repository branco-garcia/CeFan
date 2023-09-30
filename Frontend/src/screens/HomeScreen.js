import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, BackHandler, Image, TextInput, ScrollView  } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Modal from 'react-native-modal'; 

import {
  evaluarIMC,
  calcularIMC,
  calcularTMB,
  calcularDiferenciaPesoIdeal,
} from './calculosIMC'; 


const { height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;
  const route = useRoute();

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

      const response = await fetch('http://192.168.1.6:3000/api/saveUserData', {
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
    weight: '82',
    height: '180',
    age: '21',
    gender: 'masculino',
  });


  return (
    <ScrollView>
    <View style={styles.container}>
      <Image source={require('./Logo.png')} style={styles.logoImage} />
      
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
          <Image source={require('./imagenn.png')} style={styles.personImage} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 40,
    paddingLeft: 20,
    backgroundColor: '#252A31',
  },
  logoImage: {
    width: 56,
    height: 56,
    borderRadius: 60,
    resizeMode: 'cover',
    position: 'absolute',
    top: 5,
    left: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuButton: {
    padding: 10,
    top: 10,
    left: -15,
    fontSize: 21,
  },
  menuButtonText: {
    fontSize: 24,
    color: '#00ADB5',
  },
  welcomeText: {
    fontSize: 21,
    marginLeft: 10,
    color: '#FFFFFF',
    top: 10,
    left: -25,
  },
   menuOption: {
    backgroundColor: '#00ADB5', 
    borderRadius: 15, 
    marginTop: 10,
    padding: 10, 
    opacity: 0.9, 
    shadowColor: '#00ADB5', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 5,
    elevation: 5, 
    zIndex: 1, 
  },
  menuOptions: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    
  },
  menuOptionContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  menuOptionText: {
    fontSize: 18,
    color: 'white',
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#00ADB5', // Color de fondo del botón
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 18,
    color: 'white',
  },
  logoutModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
  },
  logoutModalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  logoutModalButton: {
    backgroundColor: '#00ADB5',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginVertical: 5,
  },
  logoutModalButtonText: {
    fontSize: 18,
    color: 'white',
  },
  dataSection: {
    flex: 1,
    padding: 10,
    borderRadius: 1,
    top: -17,
    left: -12,
  },
  dataTitle: {
    fontSize: 26,
    marginBottom: 1,
    color: '#00ADB5',
    textAlign: 'left',
    
  },
  dataValue: {
    fontSize: 26,
    color: 'white',
    textAlign: 'right',
   
  },
  personImage: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'center',
    left: 95,
    top: -14,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#00ADB5',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 16,
    alignSelf: 'center',
    top: -50,
    left: 115,
  },
  editButtonText: {
    fontSize: 18,
    color: 'white',
  },
  editModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
  },
  editModalTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  editModalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#00ADB5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 18,
    color: 'white',
  },
  cancelButton: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 18,
    color: 'white',
  },
  calculadoraIMCText: {
    fontSize: 25,
    color: '#00ADB5',
    alignSelf: 'center',
    marginTop: 10,
    top: -48,
  },

  resultadosContainer: {
    borderRadius: 30,
    alignSelf: 'center',
    backgroundColor: '#00ADB5',
    padding: 10,
    marginTop: 2,
    top: -50,
    width: '80%', 
    marginHorizontal: '10px', 
  },
  
  resultadoItem: {
    marginBottom: 1,
  },


  resultadoTexto: {
    alignSelf: 'center',
    color:'white',
    fontSize: 20, 
  },

  containerResult: {
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 5,
    fontSize: 18, 
  },
});

export default HomeScreen;