import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HeaderUser() {
  const [user, setUser] = useState('');

  useEffect(() => {
    getUserLocalStorage();
  }, []);

  async function getUserLocalStorage() {
    const user = await AsyncStorage.getItem('users');
    const { name } = JSON.parse(user);
    setUser(name);
  }

  return (
    <View style={styles.header}>
      <Text style={styles.titleUser}>Olá, {user}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleUser: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
