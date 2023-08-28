import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Bienvenida" component={WelcomeScreen} />
        <Stack.Screen name="Inicio de Sesión" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
        {/* Agrega más pantallas aquí si es necesario */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
