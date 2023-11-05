import React from 'react';
import { render } from '@testing-library/react-native';
import WelcomeScreen from './WelcomeScreen';

describe('Prueba de rendimiento para WelcomeScreen', () => {
  // Cuantas veces hara repeticiones
  const iterations = 100; 

  it('Prueba cuanto tiempo se demora WelcomeScreen', () => {
    const startTime = performance.now(); // Inicia la medición del tiempo

    for (let i = 0; i < iterations; i++) {
      render(<WelcomeScreen navigation={{ navigate: jest.fn() }} />); 
    }

    const endTime = performance.now(); // Finaliza la medición del tiempo
    const averageTime = (endTime - startTime) / iterations;

    console.log(`Tiempo promedio que se demora en renderizar: ${averageTime} en millisegundos `);
  });
});
