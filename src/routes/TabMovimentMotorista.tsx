import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Estoque from '../pages/Estoque';
import { AuthContext } from '../context/AuthContext';
import { TouchableOpacity } from 'react-native';
import MovimentMotorista from '../pages/MovimentMotorista';

const Tab = createBottomTabNavigator();

export default function TabMovimentMotorista() {
  const { logout } = useContext(AuthContext);

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
        name="MovimentMotorista"
        component={MovimentMotorista}
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
                logout?.(); // Chama a função de logout diretamente
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
