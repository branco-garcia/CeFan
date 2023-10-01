import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../styles/StyledWelcome'

const WelcomeScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Inicio de Sesión');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../img/Logo.png')} style={styles.logoImage} />
      <Text style={styles.title}>Bienvenido a CeFan</Text>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <View style={styles.swiperContainer}>
        <Swiper style={styles.wrapper} loop={true} autoplayDirection={true} height={200} autoplay>
          <View style={styles.slide}>
            <Image source={require('../img/imagen1.png')} style={styles.slideImage} />
          </View>
          <View style={styles.slide}>
            <Image source={require('../img/imagen2.png')} style={styles.slideImage} />
          </View>
          <View style={styles.slide}>
            <Image source={require('../img/imagen3.png')} style={styles.slideImage} />
          </View>
        </Swiper>
      </View>
      <Text style={styles.description}>
        ¡Adelante, a disfrutar de una experiencia única y cuida tu tiempo!
      </Text>

      {/* Agregar iconos de redes sociales */}
      <View style={styles.socialIconsContainer}>
        <TouchableOpacity>
          <Icon name="facebook" size={30} color="#1877f2" style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="twitter" size={30} color="#1da1f2" style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="instagram" size={30} color="#e4405f" style={styles.socialIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default WelcomeScreen;
