import { StyleSheet } from "react-native";
 export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#252A31',
    },
    swiperContainer: {
      height: 200,
      top: 150,
    },
    wrapper: {},
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slideImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    logoImage: {
      width: 68,
      height: 68,
      borderRadius: 60,
      resizeMode: 'cover',
      position: 'absolute',
      top: 10,
      left: 10,
    },
    title: {
      position: 'absolute',
      top: 80,
      right: 90,
      fontSize: 24,
      marginBottom: 20,
      color: '#00ADB5',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    description: {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 20,
      fontSize: 30,
      color: '#00ADB5',
      top: 220,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    loginButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: '#00ADB5',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    socialIconsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 300,
    },
    socialIcon: {
      marginHorizontal: 10,
    },
  });
