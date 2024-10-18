import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

export default function Moviments({ item }) {
  return (
    <View style={styles.movementCard}>
      <View style={styles.movementInfo}>
        <Text style={styles.movementTitle}>Produto: {item.produto.nome}</Text>
        <Text style={styles.movementText}>
          Data de Criação: {item.dataCriacao}
        </Text>
        <Text style={styles.movementText}>Origem: {item.origem.nome}</Text>
        <Text style={styles.movementText}>
          Localização Origem: {item.origem.latitude}, {item.origem.longitude}
        </Text>
        <Text style={styles.movementText}>Destino: {item.destino.nome}</Text>
        <Text style={styles.movementText}>
          Localização Destino: {item.destino.latitude}, {item.destino.longitude}
        </Text>
        <Text style={styles.movementText}>Quantidade: {item.quantidade}</Text>
        <Text style={styles.movementText}>Status: {item.status}</Text>
      </View>
      <Image
        source={{ uri: item.produto.imagem }}
        style={styles.productImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  movementCard: {
    backgroundColor: '#2c003e', 
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4b0082',
  },
  movementInfo: {
    flex: 1,
  },
  movementTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  movementText: {
    color: '#B0C4DE',
    fontSize: 14,
    marginBottom: 5,
  },
  productImage: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
});
