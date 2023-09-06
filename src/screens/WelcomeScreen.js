import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const WelcomeScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Inicio de Sesión');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./Logo.png')} style={styles.logoImage} />
      <Text style={styles.title}>Bienvenido a CeFan</Text>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <View style={styles.swiperContainer}>
        <Swiper style={styles.wrapper} loop={true} autoplayDirection={true} height={200} autoplay  >
          <View style={styles.slide}>
            <Image source={require('./imagen1.png')} style={styles.slideImage} />
          </View>
          <View style={styles.slide}>
            <Image source={require('./imagen2.png')} style={styles.slideImage} />
          </View>
          <View style={styles.slide}>
            <Image source={require('./imagen3.png')} style={styles.slideImage} />
          </View>
        </Swiper>
      </View>
      <Text style={styles.description}>
      ¡Adelante, a disfrutar de una experiencia única y cuida tu tiempo!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252A31',
  },
  swiperContainer: {
    height: 200, 
    top: 150,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoImage: {
    width: 68,
    height: 68,
    borderRadius: 60,
    resizeMode: 'cover',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  title: {
    position: 'absolute',
    top: 80,
    right: 90,
    fontSize: 24,
    marginBottom: 20,
    color: '#00ADB5',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    fontSize: 30,
    color: '#00ADB5',
    top: 250,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#00ADB5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
