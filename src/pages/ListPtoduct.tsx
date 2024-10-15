import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';
import Product from '../components/Product';

interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
  description: string;
  image: string;
}

export default function ListProduct() {
  const [products, setProducts] = useState<Product[] | null>([]);

  async function getProducts() {
    try {
      const response = await axios.get('http://192.168.15.7:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos: ', error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerProducts}>
        <Text style={styles.titleProducts}>PRODUTOS</Text>
      </View>
      <View style={styles.bodyProducts}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Product
              id={item.id}
              name={item.name}
              price={item.price}
              brand={item.brand}
              description={item.description}
              image={item.image}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#121212',
    flex: 1,
  },
  headerProducts: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleProducts: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bodyProducts: {
    flex: 1,
  },
  productContainer: {
    marginBottom: 20,
  },
  productName: {
    color: '#fff',
    fontSize: 18,
  },
  productPrice: {
    color: '#bbb',
    fontSize: 16,
  },
  productBrand: {
    color: '#999',
    fontSize: 14,
  },
  productDescription: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});
