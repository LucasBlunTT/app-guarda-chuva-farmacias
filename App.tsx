import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigator from './src/routes/Stack';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import color from './src/styles/colors';
import { AuthProvider } from './src/context/AuthContext';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import React from 'react';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  // Se as fontes não estão carregadas, exibe um indicador de carregamento
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  // Se as fontes estão carregadas, renderiza o app normalmente
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor={color.bg} />
        <StackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
