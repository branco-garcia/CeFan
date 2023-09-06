import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, TextInputBase, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';



export default function App() {
  return (
    <>
      <StatusBar style='light'/>
      <NativeRouter>
        <Main />
      </NativeRouter>
    </>
  );
}