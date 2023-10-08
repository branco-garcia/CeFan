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
    modalContainer: {
      flex: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00ADB5', 
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
      marginTop: 250,
      marginHorizontal: 25
    },
    closeButton: {
      fontSize: 20,
      color: 'black',
      marginBottom: 16,
      backgroundColor: 'white',
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    modalText: {
      fontSize: 20,
      color: 'white',
      marginBottom: 16,
    },
  });