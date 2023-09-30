import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';
import axios from 'axios';

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
      const response = await axios.get('http://192.168.1.6:3000/api/citas/disponibles');
      const citas = response.data.citas;
      setCitasDisponibles(citas);
    } catch (error) {
      console.error(error);
    }
  };

  const reservarCita = async (citaId) => {
    try {
      const response = await axios.post('http://192.168.1.6:3000/api/citas/reservar', {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#252A31',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#00ADB5',
    left: 27,
  },
  description: {
    fontSize: 22,
    marginBottom: 24,
    color: 'white',
    left: 75,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  citaItem: {
    backgroundColor: '#00ADB5',
    padding: 6,
    marginBottom: 16,
    borderRadius: 8,
  },
  selectedCitaItem: {
    backgroundColor: 'green', 
  },
  citaText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 8,
  },
  selectedCitaText: {
    color: 'white',
  },
  reservaButton: {
    backgroundColor: '#00ADB5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  reservaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    
  },
  logoutModalContent: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutModalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  logoutModalButton: {
    backgroundColor: '#00ADB5',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginVertical: 5,
  },
  logoutModalButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default HorasMedicasScreen;
