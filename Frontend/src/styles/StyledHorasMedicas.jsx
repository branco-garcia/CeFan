import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
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
  