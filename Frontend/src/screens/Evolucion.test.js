import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Evolucion from './Evolucion';

const Stack = createNativeStackNavigator();

describe('Prueba de rendimiento para Evolucion', () => {
  const iterations = 100; // Número de iteraciones para medir el rendimiento

  it('Mide cuanto tiempo se demora en renderizar Evolucion', () => {
    const startTime = performance.now();

    for (let i = 0; i < iterations; i++) {
      render(
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Evolucion"
              component={Evolucion}
              initialParams={{ usuario: 'NombreUsuario', rutt: 'Aa' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    const endTime = performance.now();
    const averageTime = (endTime - startTime) / iterations;

    console.log(`Tiempo que se demora en renderizar Evolucion: ${averageTime} milisegundos`);
  });
});
