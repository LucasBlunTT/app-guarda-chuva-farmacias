import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import Tabs from './Tabs';
import { AuthContext } from '../context/AuthContext';

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
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
