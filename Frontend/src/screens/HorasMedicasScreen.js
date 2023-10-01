import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import axios from 'axios';
import { styles } from '../styles/StyledHorasMedicas';

const HorasMedicasScreen = ({ route }) => {
  const { usuario, rutt } = route.params;
  const [citasDisponibles, setCitasDisponibles] = useState([]);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    obtenerCitasDisponibles();
  }, []);

  const obtenerCitasDisponibles = async () => {
    try {
      const response = await axios.get('http://45.236.129.38:3000/api/citas/disponibles');
      const citas = response.data.citas;
      setCitasDisponibles(citas);
    } catch (error) {
      console.error(error);
    }
  };

  const reservarCita = async (citaId) => {
    try {
      const response = await axios.post('http://45.236.129.38:3000/api/citas/reservar', {
        citaId,
        pacienteId: rutt,
      });
  
      if (response.status === 200) {
        obtenerCitasDisponibles();
        setModalVisible(true);
      } else {
        console.error('Error al reservar la cita:', response.data.message);
      }
    } catch (error) {
      console.error('Error al reservar la cita:', error.message);
    }
  };
  

  const isSelected = (cita) => citaSeleccionada && citaSeleccionada._id === cita._id;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Horas Médicas Disponibles</Text>
        <Text style={styles.description}> {usuario}, Elige tu Hora</Text>

        <Text style={styles.subtitle}>Citas Disponibles:</Text>
        {citasDisponibles.map((cita) => (
          <TouchableOpacity
            key={cita._id}
            style={[styles.citaItem, isSelected(cita) && styles.selectedCitaItem]}
            onPress={() => setCitaSeleccionada(cita)}
          >
            <Text style={[styles.citaText, isSelected(cita) && styles.selectedCitaText]}>
              Doctor: {cita.doctor}
            </Text>
            <Text style={[styles.citaText, isSelected(cita) && styles.selectedCitaText]}>
              Especialidad: {cita.especialidad}
            </Text>
            <Text style={[styles.citaText, isSelected(cita) && styles.selectedCitaText]}>
              Fecha: {cita.fecha}
            </Text>
            <Text style={[styles.citaText, isSelected(cita) && styles.selectedCitaText]}>
              Disponible: {cita.disponible ? 'Sí' : 'No'}
            </Text>
          </TouchableOpacity>
        ))}

        {citaSeleccionada && !citaSeleccionada.reservada && (
          <TouchableOpacity
            style={styles.reservaButton}
            onPress={() => reservarCita(citaSeleccionada._id)}
          >
            <Text style={styles.reservaButtonText}>Reservar Cita</Text>
          </TouchableOpacity>
        )}

<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(false);
  }}
>
  <View style={styles.logoutModal}>
    <View style={styles.logoutModalContent}>
      <Text style={styles.logoutModalText}>¡La cita se ha registrado correctamente!</Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#00ADB5', 
          paddingHorizontal: 20, 
          paddingVertical: 10, 
          borderRadius: 5, 
        }}
        onPress={() => {
          setModalVisible(false);
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Cerrar
        </Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
      </View>
    </ScrollView>  
  );
}

export default HorasMedicasScreen;
