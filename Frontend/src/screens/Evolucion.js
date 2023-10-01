import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { styles } from '../styles/StyledEvolucion';


const Evolucion = ({ route }) => {
  const { usuario, rutt } = route.params;
  const [evoluciones, setEvoluciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvolucion, setSelectedEvolucion] = useState(null); // Estado para la evolución seleccionada
  const [isModalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    axios
      .get(`http://45.236.129.38:3000/api/evoluciones/${rutt}`)
      .then((response) => {
        if (response.data.evoluciones) {
          setEvoluciones(response.data.evoluciones);
        } else {
          console.log(response.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [rutt]);

  const openModal = (evolucion) => {
    setSelectedEvolucion(evolucion);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedEvolucion(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Horas</Text>
      {loading ? (
        <Text>Cargando citas...</Text>
      ) : evoluciones.length > 0 ? (
        <View>
          {evoluciones.map((evolucion) => (
            <TouchableOpacity
              key={evolucion._id}
              style={styles.evolucionContainer}
              onPress={() => openModal(evolucion)}
            >
              <Text style={styles.text}>Doctor: {evolucion.doctor}</Text>
              <Text style={styles.text}>Especialidad: {evolucion.especialista}</Text>
              <Text style={styles.text}>Fecha: {evolucion.hora}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text>No hay citas disponibles para este paciente.</Text>
      )}

      {/* Modal */}
      <Modal
  visible={isModalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={closeModal}
>
  <View style={styles.modalContainer}>
    <TouchableOpacity onPress={closeModal}>
      <Text style={styles.closeButton}>Cerrar</Text>
    </TouchableOpacity>
    {selectedEvolucion && (
      <View>
        <Text style={styles.modalText}>Notas: {selectedEvolucion.notas}</Text>
        <Text style={styles.modalText}>Medicamentos: {selectedEvolucion.medicamentos}</Text>
        {/* Otras secciones */}
      </View>
    )}
  </View>
</Modal>
    </View>
  );
};

export default Evolucion;
