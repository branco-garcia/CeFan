import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

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
  };

  const menuOptionsStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
    marginTop: 10,
    overflow: 'hidden',
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Bienvenido Branco</Text>
      </View>
      <Animated.View style={[styles.menuOptions, menuOptionsStyle, slideInStyle]}>
        <View style={styles.menuOptionContainer}>
          <TouchableOpacity style={styles.menuOption} onPress={toggleMenu}>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuButton: {
    padding: 10,
  },
  menuButtonText: {
    fontSize: 24,
    color: '#00ADB5',
  },
  welcomeText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#FFFFFF',
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
});

export default HomeScreen;

