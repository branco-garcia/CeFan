import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import HorasMedicasScreen from './src/screens/HorasMedicasScreen';
import MisHoras from './src/screens/MisHoras';
import Evolucion from './src/screens/Evolucion';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Bienvenida" component={WelcomeScreen} />
        <Stack.Screen name="Inicio de Sesión" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Perfil" component={ProfileScreen} />
        <Stack.Screen name="HorasMedicas" component={HorasMedicasScreen} />
        <Stack.Screen name="MisHora" component={MisHoras} />
        <Stack.Screen name="Evolucion" component={Evolucion} />
        {/* Agrega más pantallas aquí si es necesario */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
