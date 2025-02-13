import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import Product from '../components/product/Product';

interface Product {
  product_name: string;
  branch_name: string;
  quantity: number;
  image_url: string;
}

export default function Estoque() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getProducts = async (query: string = ''): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get<Product[]>(
        `${process.env.EXPO_PUBLIC_API}/products`,
        {
          params: { query },
        },
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProducts();
    }, []),
  );

  const handleSearch = () => {
    getProducts(searchQuery);
  };

  return (
    <View style={styles.container}>
      <TextInput
        cursorColor="#FFF"
        style={styles.searchInput}
        placeholder="Pesquisar por produto ou filial"
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.product_name}
          renderItem={({ item }) => <Product item={item} />}
          ListEmptyComponent={<Text style={styles.loadingText}>Nenhum produto encontrado</Text>}
        />
      )}
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  searchInput: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 8,
    color: '#FFF',
    fontSize: 16,
    marginBottom: 15,
  },
  searchButton: {
    backgroundColor: '#A71412',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  searchButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
  },
});
