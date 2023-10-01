export function validarRUT(rut) {
    // Eliminar puntos y guiones del RUT y pasarlo a mayúsculas
    rut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    
    // Separar el RUT en parte numérica y dígito verificador
    const rutParteNumerica = rut.slice(0, -1);
    const rutDigitoVerificador = rut.slice(-1);
    
    // Validar que la parte numérica sea un número válido
    if (!/^[0-9]+$/.test(rutParteNumerica)) {
      return false;
    }
    
    // Calcular el dígito verificador esperado
    let suma = 0;
    let multiplicador = 2;
    for (let i = rutParteNumerica.length - 1; i >= 0; i--) {
      suma += parseInt(rutParteNumerica.charAt(i)) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    const digitoVerificadorEsperado = 11 - (suma % 11);
    const digitoVerificadorCalculado = digitoVerificadorEsperado === 10 ? 'K' : digitoVerificadorEsperado.toString();
    
    // Comparar el dígito verificador calculado con el ingresado
    return rutDigitoVerificador === digitoVerificadorCalculado;
  }