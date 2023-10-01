function evaluarIMC(imc) {
    if (imc < 18.5) {
        return "Bajo peso";
    } else if (imc >= 18.5 && imc < 24.9) {
        return "Normal";
    } else if (imc >= 24.9 && imc < 29.9) {
        return "Sobrepeso";
    } else {
        return "Obesidad";
    }
}

function calcularIMC(peso, alturaCm) {
    var alturaM = alturaCm / 100;  
    var imc = peso / (alturaM ** 2);
    return imc;
}

function calcularTMB(peso, alturaCm, edad, genero) {
    var alturaM = alturaCm / 100; 
    if (genero.toLowerCase() === "masculino") {
        var tmb = 88.362 + (13.397 * peso) + (4.799 * alturaM * 100) - (5.677 * edad);
    } else if (genero.toLowerCase() === "femenino") {
        var tmb = 447.593 + (9.247 * peso) + (3.098 * alturaM * 100) - (4.330 * edad);
    } else {
        return null;
    }
    return tmb;
}

function calcularDiferenciaPesoIdeal(peso, alturaCm) {
    var alturaM = alturaCm / 100;  
    var pesoIdeal = 24.9 * (alturaM ** 2);
    var diferencia = peso - pesoIdeal;
    return [pesoIdeal, diferencia];
}


module.exports = {
    evaluarIMC,
    calcularIMC,
    calcularTMB,
    calcularDiferenciaPesoIdeal,
};