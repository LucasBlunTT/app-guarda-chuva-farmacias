import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; // Usando MaterialIcons do Expo
import Estoque from '../pages/Estoque';
import Usuarios from '../pages/Usuarios';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: '#A71412',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopWidth: 0,
          minHeight: 60,
        },
        tabBarItemStyle: {
          paddingBottom: 10,
          paddingTop: 5,      
        },
      })}
    >
      <Tab.Screen
        name="Estoque"
        component={Estoque}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name={'inventory'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Usuarios"
        component={Usuarios}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name={'group'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
