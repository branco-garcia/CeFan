import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterScreen from './RegisterScreen';

describe('Prueba de rendimiento para RegisterScreen', () => {
  // Cuantas veces hara repeticiones
  const iterations = 1000;

  it('Mide cuanto tiempo se demora en renderizar el registro', () => {
    const startTime = performance.now(); // Inicia la medición del tiempo

    for (let i = 0; i < iterations; i++) {
      render(<RegisterScreen />);
    }

    const endTime = performance.now(); // Finaliza la medición del tiempo
    const averageTime = (endTime - startTime) / iterations;

    console.log(`Tiempo promedio que se demora en renderizar: ${averageTime} en milliseconds`);
  });

  it('Mide cuanto tiempo se demora en tomar el input del usuario', () => {
    const { getByPlaceholderText } = render(<RegisterScreen />);
    const nombreInput = getByPlaceholderText('Nombre');
    const rutInput = getByPlaceholderText('RUT');
    const correoInput = getByPlaceholderText('Correo Electrónico');
    const telefonoInput = getByPlaceholderText('Número de Teléfono');
    const contrasenaInput = getByPlaceholderText('Contraseña');

    const startTime = performance.now(); // Inicia la medición del tiempo

    for (let i = 0; i < iterations; i++) {
      fireEvent.changeText(nombreInput, 'John Doe');
      fireEvent.changeText(rutInput, '12345678-9');
      fireEvent.changeText(correoInput, 'johndoe@example.com');
      fireEvent.changeText(telefonoInput, '123456789');
      fireEvent.changeText(contrasenaInput, 'securepassword');
    }

    const endTime = performance.now(); // Finaliza la medición del tiempo
    const averageTime = (endTime - startTime) / iterations;

    console.log(`Riempo promedio que se demora en manejar el input: ${averageTime} milliseconds`);
  });
});
