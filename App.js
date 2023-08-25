import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/screens/RegisterScreen'; // Ajusta la ruta correcta para RegisterScreen

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Registro" component={RegisterScreen} />
        {/* Agrega más pantallas aquí si es necesario */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
