import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const MisHoras = ({ route }) => {
  const { usuario, rutt } = route.params;
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://192.168.1.6:3000/api/citas/disponibles/${rutt}`)
      .then((response) => {
        console.log(rutt)
        if (response.data.citas) {
          setCitas(response.data.citas);
        } else {
          console.log(response.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); //
      });
  }, [rutt]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Horas</Text>
      {loading ? (
        <Text>Cargando citas...</Text>
      ) : citas.length > 0 ? (
        <View>
          {citas.map((cita) => (
            <View key={cita._id} style={styles.citaContainer}>
              <Text style={styles.text}>Doctor: {cita.doctor}</Text>
              <Text style={styles.text}>Especialidad: {cita.especialidad}</Text>
              <Text style={styles.text}>Fecha: {cita.fecha}</Text>
              {/* Otros campos de cita */}
            </View>
          ))}
        </View>
      ) : (
        <Text>No hay citas disponibles para este paciente.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#252A31',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#00ADB5',
  },
  citaContainer: {
    backgroundColor: '#00ADB5',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  text: {
    fontSize: 20,
  },
});

export default MisHoras;
