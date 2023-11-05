import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';

describe('Prueba de rendimiento para LoginScreen', () => {
  const iterations = 1000;

  it('Mide cuanto tiempo se demora en manejar el input y el render de LoginScreen', () => {
    const startTime = performance.now(); // Inicia la medición del tiempo

    for (let i = 0; i < iterations; i++) {
      const { getByPlaceholderText } = render(
        <LoginScreen navigation={{ navigate: jest.fn() }} />
      ); // Mock de la función de navegación
      const rutInput = getByPlaceholderText('RUT');
      const contrasenaInput = getByPlaceholderText('Contraseña');

      fireEvent.changeText(rutInput, 'Aa');
      fireEvent.changeText(contrasenaInput, 'Aa');
    }

    const endTime = performance.now(); // Finaliza la medición del tiempo
    const averageTime = (endTime - startTime) / iterations;

    console.log(`Tiempo promedio que se demora en renderizar: ${averageTime} milisegundos`);
  });
});
