import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import HeaderLogin from '../components/header/HeaderLogin';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('123456');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const authContext = useContext(AuthContext);
  const loginUser = authContext?.login;

  interface Data {
    email: string;
    password: string;
  }

  async function login() {
    if (!email || !password) {
      setIsModalVisible(true);
      return;
    }

    try {
      const response = await axios.post('http://192.168.15.6:3000/login', {
        email,
        password,
      });

      const { data } = response;
      salvarLocalStorage(data);
      loginUser();
    } catch (error) {
      console.log(error);
    } finally {
      setEmail('');
      setPassword('');
    }
  }

  async function salvarLocalStorage(data: Data) {
    try {
      await AsyncStorage.setItem('users', JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <HeaderLogin />
      <View style={styles.body}>
        <TextInput
          cursorColor={'#FFF'}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          cursorColor={'#FFF'}
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.buttonLogin} onPress={login}>
          <Text style={styles.textLogin}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Atenção</Text>
            <Text style={styles.modalMessage}>Preencha todos os campos!</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
  },
  body: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: '80%',
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    color: '#FFF',
    fontSize: 16,
  },
  buttonLogin: {
    backgroundColor: '#A71412',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  textLogin: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#A71412',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
