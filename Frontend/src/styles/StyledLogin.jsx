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
    registerContainer: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    registerText: {
      color: '#EEEEEE',
    },
    registerLink: {
      color: '#00ADB5',
      marginLeft: 5,
      textDecorationLine: 'underline',
    },
    errorModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    errorModalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 5,
      alignItems: 'center',
    },
    errorText: {
      fontSize: 18,
      marginBottom: 20,
    },
    errorButton: {
      backgroundColor: '#00ADB5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    },
    errorButtonText: {
      fontSize: 18,
      color: 'white',
    },
    
    
  });