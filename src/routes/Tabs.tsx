import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; // Usando MaterialIcons do Expo
import ListProduct from '../pages/ListPtoduct';
import Avaliation from '../pages/Avaliation';
import { propsNavigationTab } from './models/types';

const Tab = createBottomTabNavigator<propsNavigationTab>();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: '#121212',
        tabBarInactiveTintColor: '#3c3c3c',
        tabBarStyle: {
          backgroundColor: '#E2B616',
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
        name="Produtos"
        component={ListProduct}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name={'movie-filter'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Avaliacao"
        component={Avaliation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name={'star'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
