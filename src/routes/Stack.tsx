import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import Tabs from './Tabs';
import { AuthContext } from '../context/AuthContext';
import CadastroUsuario from '../pages/CadastroUsuarios';
import CadastroMovimentacao from '../pages/CadastroMovimentacao';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabMovimentMotorista from './TabMovimentMotorista';

const Stack = createStackNavigator();

export default function StackNavigator() {
  const [userProfile, setUserProfile] = useState('');
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext?.isLoggedIn;

  async function getLocalStorage() {
    try {
      const users = JSON.parse(await AsyncStorage.getItem('users'));
      if (users?.profile) {
        setUserProfile(users.profile);
        console.log(users.profile);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      getLocalStorage();
    }
  }, [isLoggedIn]);

  return (
    <Stack.Navigator>
      {!isLoggedIn ? (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, animationEnabled: false }}
        />
      ) : userProfile === 'admin' ? (
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false, animationEnabled: false }}
        />
      ) : (
        <Stack.Screen
          name="TabMovimentMotorista"
          component={TabMovimentMotorista}
          options={{ headerShown: false, animationEnabled: false }}
        />
      )}
      <Stack.Screen
        name="CadastroUsuario"
        component={CadastroUsuario}
        options={{
          animationEnabled: false,
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
          animationEnabled: false,
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
