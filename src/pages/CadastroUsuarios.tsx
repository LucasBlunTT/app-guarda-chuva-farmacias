import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

interface UserData {
  profile: string;
  name: string;
  document: string;
  full_address: string;
  email: string;
  password: string;
}

export default function CadastroUsuario() {
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('');
  const navigation = useNavigation();

  function validarCampos() {
    if (!name || !document || !fullAddress || !email || !password || !profile) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Insira um email válido.');
      return false;
    }

    const documentRegex = profile === 'motorista' ? /^\d{11}$/ : /^\d{14}$/;
    if (!documentRegex.test(document)) {
      const tipoDocumento =
        profile === 'motorista' ? 'CPF (11 dígitos)' : 'CNPJ (14 dígitos)';
      Alert.alert('Erro', `Insira um ${tipoDocumento} válido.`);
      return false;
    }

    return true;
  }

  async function createUser() {
    if (!validarCampos()) {
      return;
    }

    try {
      const userData: UserData = {
        profile,
        name,
        document,
        full_address: fullAddress,
        email,
        password,
      };

      const response = await axios.post(
        'http://192.168.15.6:3000/register',
        userData,
      );
      if (response.status === 201) {
        Alert.alert('Sucesso', 'Usuário criado com sucesso!');
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível criar o usuário.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Cadastro de Usuário</Text>

        <Text style={styles.label}>Perfil</Text>
        <Picker
          selectedValue={profile}
          style={styles.picker}
          onValueChange={(itemValue) => setProfile(itemValue)}
        >
          <Picker.Item label="Selecione o perfil" value="" />
          <Picker.Item label="Motorista" value="motorista" />
          <Picker.Item label="Filial" value="filial" />
        </Picker>

        <TextInput
          placeholder="Nome Completo"
          placeholderTextColor="#999"
          cursorColor={'#FFF'}
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder={
            profile === 'motorista'
              ? 'CPF (somente números)'
              : 'CNPJ (somente números)'
          }
          placeholderTextColor="#999"
          cursorColor={'#FFF'}
          style={styles.input}
          value={document}
          onChangeText={setDocument}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Endereço Completo"
          placeholderTextColor="#999"
          cursorColor={'#FFF'}
          style={styles.input}
          value={fullAddress}
          onChangeText={setFullAddress}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          cursorColor={'#FFF'}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#999"
          cursorColor={'#FFF'}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity onPress={createUser} style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    color: '#FFF',
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#FFF',
    backgroundColor: '#1e1e1e',
    marginBottom: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#A71412',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
