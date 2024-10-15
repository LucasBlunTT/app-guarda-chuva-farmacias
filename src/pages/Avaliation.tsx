import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface RouteParams {
  id?: number; // ID opcional do produto
}

export default function Avaliation() {
  const route = useRoute();
  const params = route.params as RouteParams; // Recebendo o ID do produto
  const productId = params?.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [experience, setExperience] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateAndSubmit = async () => {
    if (!name || !email || !feedback || !experience) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const data = {
      id: productId,
      name: name,
      email: email,
      feedback: feedback,
      experience: experience,
      recommend: recommend,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        'http://192.168.15.7:3000/evaluations',
        data,
      );
      Alert.alert('Sucesso', 'Feedback enviado com sucesso!');
      clearFields();
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao enviar o feedback.');
    } finally {
      setLoading(false);
    }
  };

  function clearFields() {
    setName('');
    setEmail('');
    setFeedback('');
    setExperience('');
    setRecommend(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nos dê seu Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        placeholderTextColor={'#FFD700'}
        value={name}
        onChangeText={setName}
        cursorColor={'#000'}
      />
      <TextInput
        style={styles.input}
        placeholder="Seu e-mail"
        placeholderTextColor={'#FFD700'}
        value={email}
        onChangeText={setEmail}
        cursorColor={'#000'}
      />
      <TextInput
        style={styles.input}
        placeholder="Descreva sua experiência..."
        placeholderTextColor={'#FFD700'}
        value={feedback}
        onChangeText={setFeedback}
        multiline
        cursorColor={'#000'}
      />
      <Text style={styles.subtitle}>Compartilhe sua experiência</Text>
      <View style={styles.experienceContainer}>
        <TouchableOpacity
          style={[
            styles.experienceButton,
            experience === 'Feliz' && styles.selectedButton,
          ]}
          onPress={() => setExperience('Feliz')}
        >
          <Text style={styles.buttonText}>Feliz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.experienceButton,
            experience === 'Bom' && styles.selectedButton,
          ]}
          onPress={() => setExperience('Bom')}
        >
          <Text style={styles.buttonText}>Bom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.experienceButton,
            experience === 'Médio' && styles.selectedButton,
          ]}
          onPress={() => setExperience('Médio')}
        >
          <Text style={styles.buttonText}>Médio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.experienceButton,
            experience === 'Ruim' && styles.selectedButton,
          ]}
          onPress={() => setExperience('Ruim')}
        >
          <Text style={styles.buttonText}>Ruim</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>
          Recomendaria para outras pessoas?
        </Text>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setRecommend(!recommend)}
        >
          <View>
            {recommend ? (
              <MaterialCommunityIcons
                name="checkbox-marked"
                size={24}
                color={'#FFD700'}
              />
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank-outline"
                size={24}
                color="#FFD700"
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={validateAndSubmit}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.submitButtonText}>Enviar Feedback</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1E1E1E', // Cor de fundo escura
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFD700', // Amarelo dourado
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFD700', // Borda amarela para contraste
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#2A2A2A', // Fundo levemente mais claro que o container
    color: '#FFD700', // Texto amarelo dourado para maior visibilidade
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFD700', // Amarelo dourado
  },
  experienceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  experienceButton: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#FFD700', // Borda amarela
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#333', // Fundo levemente mais claro
  },
  selectedButton: {
    backgroundColor: '#FFD700', // Amarelo dourado ao selecionar
    borderColor: '#FFD700',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff', // Texto branco
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 16,
    marginRight: 10,
    color: '#fff', // Texto branco
  },
  submitButton: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#FFD700', // Botão amarelo dourado
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#000', // Texto preto para contraste
    fontWeight: 'bold',
  },
});
