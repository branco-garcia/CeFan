import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
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
    evolucionContainer: {
      backgroundColor: '#00ADB5',
      padding: 16,
      marginVertical: 8,
      borderRadius: 8,
    },
    text: {
      fontSize: 20,
    },
    // Estilos del modal
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    closeButton: {
      fontSize: 20,
      color: 'white',
      marginBottom: 16,
    },
    modalText: {
      fontSize: 20,
      color: 'white',
      marginBottom: 16,
    },
  });