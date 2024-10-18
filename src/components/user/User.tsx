import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

interface UserProps {
  item: {
    id: number;
    name: string;
    profile: string;
    status: boolean | number;
    document: string;
    email: string;
    full_address: string;
  };
}

export default function User({ item }: UserProps) {
  const [status, setStatus] = useState(item.status === 1 ? true : false);

  async function toggleUserStatus(userId: number) {
    try {
      const response = await axios.patch(
        `http://10.106.150.88:3000/users/${userId}/toggle-status`,
      );
      const { status } = response.data;
      console.log(response.data);
      setStatus(status === 1 ? true : false);
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
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userProfile}>{item.profile}</Text>
        <Text style={styles.userDocument}>CPF: {item.document}</Text>
        <Text style={styles.userEmail}>Email: {item.email}</Text>
        <Text style={styles.userAddress}>Endereço: {item.full_address}</Text>
      </View>
      <Switch value={status} onValueChange={() => toggleUserStatus(item.id)} />
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
  userInfo: {
    flex: 1,
  },
  activeUser: {
    borderColor: '#00FF00',
    backgroundColor: '#003300',
  },
  inactiveUser: {
    borderColor: '#8B0000',
    backgroundColor: '#330000',
  },
  userName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userProfile: {
    color: '#FF6347',
    fontSize: 16,
  },
  userDocument: {
    color: '#B0C4DE',
    fontSize: 14,
  },
  userEmail: {
    color: '#B0C4DE',
    fontSize: 14,
  },
  userAddress: {
    color: '#B0C4DE',
    fontSize: 14,
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
