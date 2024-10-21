import React, { useState, useEffect } from 'react';
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

export default function CadastroMovimentacao() {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [filiais, setFiliais] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const navigation = useNavigation();

  // Busca as opções para os pickers
  useEffect(() => {
    async function fetchOptions() {
      try {
        // Atualizando a rota para /branches/options
        const responseBranches = await axios.get(
          `${process.env.EXPO_PUBLIC_API}/branches/options`,
        );

        // Atualizando a rota para /products/options
        const responseProducts = await axios.get(
          `${process.env.EXPO_PUBLIC_API}/products/options`,
        );
        console.log(responseProducts.data);

        setFiliais(responseBranches.data);
        setProdutos(responseProducts.data);
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Erro',
          'Não foi possível carregar as opções de filiais e produtos.',
        );
      }
    }
    fetchOptions();
  }, []);

  function validarCampos() {
    if (!origem || !destino || !produto || !quantidade) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return false;
    }

    if (origem === destino) {
      Alert.alert('Erro', 'A filial de origem e destino devem ser diferentes.');
      return false;
    }

    const produtoSelecionado = produtos.find((p) => p.id === produto);
    if (parseInt(quantidade) > produtoSelecionado.quantidade_disponivel) {
      Alert.alert(
        'Erro',
        `A quantidade desejada não pode ser maior do que a quantidade disponível (${produtoSelecionado.quantidade_disponivel}).`,
      );
      return false;
    }

    return true;
  }

  async function createMovimentacao() {
    if (!validarCampos()) {
      return;
    }

    try {
      const movimentacaoData = {
        origem: origem,
        destino: destino,
        produto: produto,
        quantidade: parseInt(quantidade),
        observacoes: observacoes,
      };

      // Atualizando a rota para /movements
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API}/movements`,
        movimentacaoData,
      );

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Movimentação criada com sucesso!');
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível criar a movimentação.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Cadastro de Movimentação</Text>

        {/* Picker para selecionar a filial de origem */}
        <Text style={styles.label}>Filial de Origem</Text>
        <Picker
          selectedValue={origem}
          style={styles.picker}
          onValueChange={(itemValue) => setOrigem(itemValue)}
        >
          <Picker.Item label="Selecione a filial de origem" value="" />
          {filiais.map((filial) => (
            <Picker.Item
              key={filial.id}
              label={filial.name}
              value={filial.id}
            />
          ))}
        </Picker>

        {/* Picker para selecionar a filial de destino */}
        <Text style={styles.label}>Filial de Destino</Text>
        <Picker
          selectedValue={destino}
          style={styles.picker}
          onValueChange={(itemValue) => setDestino(itemValue)}
        >
          <Picker.Item label="Selecione a filial de destino" value="" />
          {filiais.map((filial) => (
            <Picker.Item
              key={filial.id}
              label={filial.name}
              value={filial.id}
            />
          ))}
        </Picker>

        {/* Picker para selecionar o produto */}
        <Text style={styles.label}>Produto</Text>
        <Picker
          selectedValue={produto}
          style={styles.picker}
          onValueChange={(itemValue) => setProduto(itemValue)}
        >
          <Picker.Item label="Selecione o produto" value="" />
          {produtos.map((produto) => (
            <Picker.Item
              key={produto.id}
              label={produto.product_id}
              value={produto.id}
            />
          ))}
        </Picker>

        {/* TextInput para informar a quantidade desejada */}
        <TextInput
          placeholder="Quantidade"
          placeholderTextColor="#999"
          cursorColor={'#FFF'}
          style={styles.input}
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />

        {/* TextInput multiline para adicionar observações */}
        <TextInput
          placeholder="Observações"
          placeholderTextColor="#999"
          cursorColor={'#FFF'}
          style={[styles.input, styles.textArea]}
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
          numberOfLines={4}
        />

        {/* Botão de cadastro */}
        <TouchableOpacity onPress={createMovimentacao} style={styles.button}>
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
  textArea: {
    height: 100,
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
