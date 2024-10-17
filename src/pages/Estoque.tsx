import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

interface Product {
  product_name: string;
  branch_name: string;
  quantity: number;
  image_url: string;
}

export default function Estoque() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const getProducts = async (query: string = '') => {
    setLoading(true);
    try {
      const response = await axios.get('http://192.168.15.6:3000/products', {
        params: { query },
      });
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
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
        style={styles.searchInput}
        placeholder="Pesquisar por produto ou filial"
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>

      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.product_name}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image
                source={{ uri: item.image_url }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.product_name}</Text>
                <Text style={styles.productBranch}>
                  Filial: {item.branch_name}
                </Text>
                <Text style={styles.productQuantity}>
                  Quantidade: {item.quantity}
                </Text>
              </View>
            </View>
          )}
        />
      )}
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
  productCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productBranch: {
    color: '#999',
    fontSize: 16,
    marginBottom: 5,
  },
  productQuantity: {
    color: '#FFF',
    fontSize: 16,
  },
});
