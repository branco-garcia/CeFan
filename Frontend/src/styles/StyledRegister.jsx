import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#252A31',
    },
    formContainer: {
      width: '80%',
      padding: 20,
      backgroundColor: '#393E46',
      borderRadius: 10,
      alignItems: 'center',
    },
    logoContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'transparent',
      marginBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoImage: {
      width: 90,
      height: 90,
      borderRadius: 30,
      resizeMode: 'cover',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: '#00ADB5',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      marginBottom: 10,
      padding: 10,
      backgroundColor: '#222831',
      borderRadius: 5,
      color: '#EEEEEE',
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 18,
      marginBottom: 10,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalClose: {
      fontSize: 16,
      color: '#00ADB5',
      textAlign: 'center',
      marginTop: 10,
    },
  });
  