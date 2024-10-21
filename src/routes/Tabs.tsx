import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Estoque from '../pages/Estoque';
import Usuarios from '../pages/Usuarios';
import Movimentacoes from '../pages/Movimentacoes';
import { AuthContext } from '../context/AuthContext';
import { TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const authContext = useContext(AuthContext);
  const logoutUser = authContext?.logout;

  return (
    <Tab.Navigator
      screenOptions={{
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
      }}
    >
      <Tab.Screen
        name="Estoque"
        component={Estoque}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="inventory" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Usuarios"
        component={Usuarios}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="group" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Movimentacoes"
        component={Movimentacoes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="swap-horiz" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={Estoque}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="logout" size={size} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                logoutUser?.(); // Chama a função de logout diretamente
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
