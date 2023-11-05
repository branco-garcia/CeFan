import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'; // Importa NavigationContainer
import ProfileScreen from './ProfileScreen';

describe('Prueba de rendimiento para ProfileScreen', () => {
  const iterations = 100; // Número de iteraciones para medir el rendimiento

  it('Mide cuanto tiempo se demora en renderizar ProfileScreen', () => {
    const startTime = performance.now(); // Inicia la medición del tiempo

    for (let i = 0; i < iterations; i++) {
      render(
        <NavigationContainer>
          <ProfileScreen
            route={{ params: { rutt: 'Aa' } }}
          />
        </NavigationContainer>
      );
    }

    const endTime = performance.now(); // Finaliza la medición del tiempo
    const averageTime = (endTime - startTime) / iterations;

    console.log(`Tiempo que se demora en renderizar ProfileScreen: ${averageTime} milisegundos`);
  });

  // Agrega más pruebas de rendimiento para otras acciones, si es necesario
});
