import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#252A31',
    },
    title: {
      marginTop: 20,
      fontSize: 24,
      color: '#FFFFFF',
      marginBottom: 20,
      fontWeight: 'bold'
    },
    userInfo: {
      fontSize: 18,
      color: '#FFFFFF',
      marginBottom: 10,
    },
    loadingText: {
      fontSize: 18,
      color: '#FFFFFF',
    },
  
    //Nuevos estilos
    profileImage:{
      width: 150,
      height: 150,
      borderRadius:100,
      marginTop: -70,
    },
    relleno: {
      padding: 10,
      backgroundColor: '#7F8F9F',
      height: 100
    },
    fontPrimario:{
      fontSize: 18,
      color: '#FFFFFF',
      marginBottom: 10,
      fontWeight:'bold'
    },
    fontSecundario:{
      fontSize: 18,
      color: '#FFFFFF',
      marginBottom: 10,
    },
    Bordes:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#7F8F9F',
      padding: 20,
      paddingBottom: 22,
      borderRadius: 10,
      shadowOpacity: 80,
      elevation: 15,
      marginTop: 20
    }
  
    // Agrega estilos adicionales según sea necesario
  });