import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator(); // Crea un StackNavigator

describe('Prueba de rendimiento para HomeScreen', () => {
  const iterations = 100; // Número de iteraciones para medir el rendimiento

  it('Mide cuanto tiempo se demora en renderizar HomeScreen', () => {
    const startTime = performance.now(); // Inicia la medición del tiempo

    for (let i = 0; i < iterations; i++) {
      render(
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              initialParams={{ rutt: 'Aa' }} // Define los parámetros iniciales
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    const endTime = performance.now(); // Finaliza la medición del tiempo
    const averageTime = (endTime - startTime) / iterations;

    console.log(`Tiempo que se demora en renderizar HomeScreen: ${averageTime} milisegundos`);
  });
});
