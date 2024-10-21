import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import Tabs from './Tabs';
import { AuthContext } from '../context/AuthContext';
import CadastroUsuario from '../pages/CadastroUsuarios';
import CadastroMovimentacao from '../pages/CadastroMovimentacao';
const Stack = createStackNavigator();

export default function StackNavigator() {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext?.isLoggedIn;

  return (
    <Stack.Navigator>
      {!isLoggedIn ? (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, animationEnabled: false }}
        />
      ) : (
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false, animationEnabled: false }}
        />
      )}
      <Stack.Screen
        name="CadastroUsuario"
        component={CadastroUsuario}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#121212',
          },
          headerTintColor: '#FFF',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="CadastroMovimentacao"
        component={CadastroMovimentacao}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#121212',
          },
          headerTintColor: '#FFF',
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
