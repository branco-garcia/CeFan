import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, BackHandler, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Modal from 'react-native-modal'; 

const { height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;
  const route = useRoute();

  const [usuario, setUsuario] = useState('');
  const [rutt, setRUT] = useState('');

  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [confirmedLogout, setConfirmedLogout] = useState(false);

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

  
  const [userInfo, setUserInfo] = useState({
    weight: '100 Kg',
    height: '180 Cm',
    age: '21 Años',
    gender: 'Masculino',
  });

  return (
    
    
    
    
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
            <Text style={styles.dataValue}>{userInfo.weight}</Text>
          </View>
          <View style={styles.dataSection}>
            <Text style={styles.dataTitle}>Edad:</Text>
            <Text style={styles.dataValue}>{userInfo.age}</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('./imagenn.png')} style={styles.personImage} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>
          <View style={styles.dataSection}>
            <Text style={styles.dataTitle}>Altura:</Text>
            <Text style={styles.dataValue}>{userInfo.height}</Text>
          </View>
          <View style={styles.dataSection}>
            <Text style={styles.dataTitle}>Género:</Text>
            <Text style={styles.dataValue}>{userInfo.gender}</Text>
          </View>
        </View>
      
      
      <TouchableOpacity style={styles.logoutButton} onPress={showLogoutModal}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.menuOptions, menuOptionsStyle, slideInStyle]}>
        <View style={styles.menuOptionContainer}>
          <TouchableOpacity style={styles.menuOption} onPress={navigateToProfile}>
            <Text style={styles.menuOptionText}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption} onPress={toggleMenu}>
            <Text style={styles.menuOptionText}>Horas Medicas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption} onPress={toggleMenu}>
            <Text style={styles.menuOptionText}>Medicamentos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption} onPress={toggleMenu}>
            <Text style={styles.menuOptionText}>Evolucion Medica</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      

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
  menuOptions: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  menuOptionContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  menuOption: {
    paddingVertical: 20,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  menuOptionText: {
    fontSize: 18,
    color: 'white',
  },
  logoutButton: {
    backgroundColor: '#00ADB5',
    paddingVertical: 5,
    paddingHorizontal: 3,
    borderRadius: 5,
    top: -490,
    left: 250,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
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
    fontSize: 23,
    marginBottom: 1,
    color: '#00ADB5',
    textAlign: 'left',
    
  },
  dataValue: {
    fontSize: 23,
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
});

export default HomeScreen;