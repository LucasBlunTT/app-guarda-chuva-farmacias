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
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchOptions() {
      try {
        const responseBranches = await axios.get(
          `${process.env.EXPO_PUBLIC_API}/branches/options`,
        );

        const responseProducts = await axios.get(
          `${process.env.EXPO_PUBLIC_API}/products/options`,
        );

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

  useEffect(() => {
    const produtoSelecionado = produtos.find((p) => p.product_id === produto);
    if (produtoSelecionado) {
      setQuantidadeDisponivel(produtoSelecionado.quantity);
    } else {
      setQuantidadeDisponivel(0);
    }
  }, [produto]);

  function validarCampos() {
    if (!origem || !destino || !produto || !quantidade) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return false;
    }

    if (origem === destino) {
      Alert.alert('Erro', 'A filial de origem e destino devem ser diferentes.');
      return false;
    }

    if (parseInt(quantidade) > quantidadeDisponivel) {
      Alert.alert(
        'Erro',
        `A quantidade desejada não pode ser maior do que a quantidade disponível (${quantidadeDisponivel}).`,
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
        originBranchId: origem,
        destinationBranchId: destino,
        productId: produto,
        quantity: parseInt(quantidade),
        observacoes: observacoes,
      };

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

        <Text style={styles.label}>Produto</Text>
        <Picker
          selectedValue={produto}
          style={styles.picker}
          onValueChange={(itemValue) => setProduto(itemValue)}
        >
          <Picker.Item label="Selecione o produto" value="" />
          {produtos.map((produto) => (
            <Picker.Item
              key={produto.product_id}
              label={`Produto: ${produto.product_id} (Filial: ${produto.branch_id})`}
              value={produto.product_id}
            />
          ))}
        </Picker>

        {produto && (
          <Text style={styles.label}>
            Quantidade disponível: {quantidadeDisponivel}
          </Text>
        )}

        <TextInput
          placeholder="Quantidade"
          placeholderTextColor="#999"
          cursorColor={'#FFF'}
          style={styles.input}
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />

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
