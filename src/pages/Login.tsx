import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import HeaderLogin from '../components/header/HeaderLogin';
import { AuthContext } from '../context/AuthContext';

interface LoginResponse {
  email: string | null;
  password: string | null;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('sklucassilva@gmail.com');
  const [password, setPassword] = useState<string>('123456');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const authContext = useContext(AuthContext);
  const loginUser = authContext?.login;

  async function login(): Promise<void> {
    if (!email || !password) {
      setIsModalVisible(true);
      return;
    }

    try {
      const response = await axios.post<LoginResponse>(
        `${process.env.EXPO_PUBLIC_API}/login`,
        { email, password },
      );

      const data = response.data;
      await salvarLocalStorage(data);
      loginUser && loginUser();
    } catch (error) {
      console.error(error);
    } finally {
      setEmail('');
      setPassword('');
    }
  }

  async function salvarLocalStorage(data: LoginResponse): Promise<void> {
    try {
      await AsyncStorage.setItem('users', JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }

  async function removeLocalStorage(): Promise<void> {
    try {
      await AsyncStorage.removeItem('users');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    removeLocalStorage();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <HeaderLogin />
        <View style={styles.body}>
          <TextInput
            cursorColor="#FFF"
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            cursorColor="#FFF"
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
          transparent
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
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

export default Login;
