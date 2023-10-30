import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from './App';



describe('App', () => {
  it('muestra la pantalla de bienvenida al iniciar la aplicación', () => {
    const { getByText } = render(<App />);
    expect(getByText('Bienvenida')).toBeTruthy();
  });
  // Agrega más pruebas para otras funcionalidades de tu aplicación aquí
});
