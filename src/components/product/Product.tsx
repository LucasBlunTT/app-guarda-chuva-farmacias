import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function Product({ item }) {
  return (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image_url }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.product_name}</Text>
        <Text style={styles.productBranch}>Filial: {item.branch_name}</Text>
        <Text style={styles.productQuantity}>Quantidade: {item.quantity}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
