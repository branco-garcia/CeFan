import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { styles } from '../styles/StyledHoras';

const MisHoras = ({ route }) => {
  const navigation = useNavigation();
  const { usuario, rutt } = route.params;
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://45.236.129.38:3000/api/citas/disponibles/${rutt}`)
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

  //Boton hacia atras
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack(); 
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, [navigation]);

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

export default MisHoras;
