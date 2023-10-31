import 'react-native';
import React from 'react';
import { perf, describe, it, expect, run } from 'react-native-performance';
import RegisterScreen from './RegisterScreen'; // Asegúrate de que la importación sea correcta

describe('RegisterScreen Performance Test', function() {
  it('renders in less than 100ms', function() {
    perf.start();
    const component = <RegisterScreen />;
    perf.stop();

    expect(perf.getLastRun().duration).toBeLessThan(100); // Ajusta el límite de tiempo según tus necesidades
  });
});

run();
