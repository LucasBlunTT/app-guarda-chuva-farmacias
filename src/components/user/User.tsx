import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

interface UserProps {
  item: {
    id: number;
    name: string;
    role: string;
    status: boolean;
  };
}

export default function User({ item }: UserProps) {
  const [status, setStatus] = useState('');

  async function toggleUserStatus(userId: number) {
    try {
      const response = await axios.patch(
        `http://192.168.15.6:3000/users/${userId}/toggle-status`,
      );
      const { status } = response.data;
      console.log(response.data);
      console.log(status);
      setStatus(status);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível atualizar o status do usuário.');
    }
  }

  return (
    <View
      style={[
        styles.userCard,
        status ? styles.activeUser : styles.inactiveUser,
      ]}
    >
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userType}>{item.role}</Text>
      <Switch
        value={item.status}
        onValueChange={() => toggleUserStatus(item.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  userCard: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
  },
  activeUser: {
    borderColor: '#00FF00', // Verde para usuário ativo
  },
  inactiveUser: {
    backgroundColor: '#FF0000', // Vermelho para usuário desativado
  },
  userName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userType: {
    color: '#999',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#A71412',
    paddingVertical: 15,
    alignItems: 'center',
    margin: 15,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
