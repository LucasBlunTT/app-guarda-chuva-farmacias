import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function CadastroUsuario() {
  const [name, setName] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // Armazena o perfil escolhido (Motorista ou Filial)
  const navigation = useNavigation();

  // Função para validar campos antes de enviar
  function validarCampos() {
    if (!name || !cpfCnpj || !address || !email || !password || !role) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return false;
    }

    // Validação básica de email e CPF/CNPJ
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Insira um email válido.');
      return false;
    }

    const cpfCnpjRegex = role === 'Motorista' ? /^\d{11}$/ : /^\d{14}$/; // CPF para motorista (11 dígitos) e CNPJ para filial (14 dígitos)
    if (!cpfCnpjRegex.test(cpfCnpj)) {
      const tipoDocumento =
        role === 'Motorista' ? 'CPF (11 dígitos)' : 'CNPJ (14 dígitos)';
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
      const userData = {
        name,
        cpfCnpj,
        address,
        email,
        password,
        role,
      };

      const response = await axios.post(
        'http://192.168.15.6:3000/users',
        userData,
      );
      if (response.status === 201) {
        Alert.alert('Sucesso', 'Usuário criado com sucesso!');
        navigation.goBack(); // Volta para a tela anterior (listagem de usuários)
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível criar o usuário.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <Text style={styles.label}>Perfil</Text>
      <Picker
        selectedValue={role}
        style={styles.picker}
        onValueChange={(itemValue) => setRole(itemValue)}
      >
        <Picker.Item label="Selecione o perfil" value="" />
        <Picker.Item label="Motorista" value="Motorista" />
        <Picker.Item label="Filial" value="Filial" />
      </Picker>

      <TextInput
        placeholder="Nome Completo"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder={
          role === 'Motorista'
            ? 'CPF (somente números)'
            : 'CNPJ (somente números)'
        }
        style={styles.input}
        value={cpfCnpj}
        onChangeText={setCpfCnpj}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Endereço Completo"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Senha"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={createUser} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
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
