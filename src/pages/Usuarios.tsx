import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import HeaderUser from '../components/header/HeaderUser';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import User from '../components/user/User';

export default function Usuarios() {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getUsers();
    }, []),
  );

  async function getUsers() {
    try {
      const response = await axios.get('http://192.168.15.6:3000/users');
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  }

  return (
    <View style={styles.container}>
      <HeaderUser />
      <View style={styles.body}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <User item={item} />}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('CadastroUsuario' as never)}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Adicionar Novo Usuário</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  body: {
    flex: 1,
    paddingHorizontal: 15,
  },
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
    borderColor: '#00FF00',
  },
  inactiveUser: {
    backgroundColor: '#FF0000',
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
