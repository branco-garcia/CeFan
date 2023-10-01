import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingTop: 40,
      paddingLeft: 20,
      backgroundColor: '#252A31',
    },
    logoImage: {
      width: 56,
      height: 56,
      borderRadius: 60,
      resizeMode: 'cover',
      position: 'absolute',
      top: 5,
      left: 10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    menuButton: {
      padding: 10,
      top: 10,
      left: -15,
      fontSize: 21,
    },
    menuButtonText: {
      fontSize: 24,
      color: '#00ADB5',
    },
    welcomeText: {
      fontSize: 21,
      marginLeft: 10,
      color: '#FFFFFF',
      top: 10,
      left: -25,
    },
     menuOption: {
      backgroundColor: '#00ADB5', 
      borderRadius: 15, 
      marginTop: 10,
      padding: 10, 
      opacity: 0.9, 
      shadowColor: '#00ADB5', 
      shadowOffset: { width: 0, height: 2 }, 
      shadowRadius: 5,
      elevation: 5, 
      zIndex: 1, 
    },
    menuOptions: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      
    },
    menuOptionContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  
    menuOptionText: {
      fontSize: 18,
      color: 'white',
    },
    logoutButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: '#00ADB5', // Color de fondo del botón
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    logoutButtonText: {
      fontSize: 18,
      color: 'white',
    },
    logoutModal: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 5,
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
    dataSection: {
      flex: 1,
      padding: 10,
      borderRadius: 1,
      top: -17,
      left: -12,
    },
    dataTitle: {
      fontSize: 26,
      marginBottom: 1,
      color: '#00ADB5',
      textAlign: 'left',
      
    },
    dataValue: {
      fontSize: 26,
      color: 'white',
      textAlign: 'right',
     
    },
    personImage: {
      width: 150,
      height: 200,
      resizeMode: 'contain',
    },
    imageContainer: {
      alignItems: 'center',
      left: 95,
      top: -14,
      marginBottom: 10,
    },
    editButton: {
      backgroundColor: '#00ADB5',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginTop: 16,
      alignSelf: 'center',
      top: -50,
      left: 115,
    },
    editButtonText: {
      fontSize: 18,
      color: 'white',
    },
    editModal: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 5,
    },
    editModalTitle: {
      fontSize: 24,
      marginBottom: 20,
      fontWeight: 'bold',
    },
    editModalInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    saveButton: {
      backgroundColor: '#00ADB5',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignSelf: 'center',
      marginTop: 10,
    },
    saveButtonText: {
      fontSize: 18,
      color: 'white',
    },
    cancelButton: {
      backgroundColor: 'gray',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignSelf: 'center',
      marginTop: 10,
    },
    cancelButtonText: {
      fontSize: 18,
      color: 'white',
    },
    calculadoraIMCText: {
      fontSize: 25,
      color: '#00ADB5',
      alignSelf: 'center',
      marginTop: 10,
      top: -48,
    },
  
    resultadosContainer: {
      borderRadius: 30,
      alignSelf: 'center',
      backgroundColor: '#00ADB5',
      padding: 10,
      marginTop: 2,
      top: -50,
      width: '80%', 
      marginHorizontal: '10px', 
    },
    
    resultadoItem: {
      marginBottom: 1,
    },
  
  
    resultadoTexto: {
      alignSelf: 'center',
      color:'white',
      fontSize: 20, 
    },
  
    containerResult: {
      borderRadius: 5,
      alignSelf: 'center',
      backgroundColor: 'white',
      padding: 5,
      fontSize: 18, 
    },
  });