import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

export default function Moviments({ item }) {
  const [showMap, setShowMap] = useState(false);

  return (
    <View style={styles.movementCard}>
      <View style={styles.movementInfo}>
        <Text style={styles.movementTitle}>Produto: {item.produto.nome}</Text>
        <Text style={styles.movementText}>
          Data de Criação: {item.dataCriacao}
        </Text>
        <Text style={styles.movementText}>Origem: {item.origem.nome}</Text>
        <Text style={styles.movementText}>Destino: {item.destino.nome}</Text>
        <Text style={styles.movementText}>Quantidade: {item.quantidade}</Text>
        <Text style={styles.movementText}>Status: {item.status}</Text>
        <Image
          source={{ uri: item.produto.imagem }}
          style={styles.productImage}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.showMapButton,
          { backgroundColor: showMap ? '#512DA8' : '#673AB7' },
        ]}
        onPress={() => setShowMap(!showMap)}
      >
        <Text style={styles.showMapButtonText}>
          {showMap ? 'Fechar Mapa' : 'Mostrar Mapa'}
        </Text>
      </TouchableOpacity>

      {showMap && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: (item.origem.latitude + item.destino.latitude) / 2,
              longitude: (item.origem.longitude + item.destino.longitude) / 2,
              latitudeDelta:
                Math.abs(item.origem.latitude - item.destino.latitude) + 5,
              longitudeDelta:
                Math.abs(item.origem.longitude - item.destino.longitude) + 5,
            }}
          >
            <Marker
              coordinate={{
                latitude: item.origem.latitude,
                longitude: item.origem.longitude,
              }}
              title="Origem"
              description={item.origem.nome}
            />

            <Marker
              coordinate={{
                latitude: item.destino.latitude,
                longitude: item.destino.longitude,
              }}
              title="Destino"
              description={item.destino.nome}
              pinColor="blue"
            />
          </MapView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  movementCard: {
    backgroundColor: '#2c003e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#4b0082',
  },
  movementInfo: {
    alignItems: 'center',
    marginBottom: 10,
  },
  movementTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  movementText: {
    color: '#E0E0E0',
    fontSize: 14,
    marginBottom: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
    overflow: 'hidden',
  },
  mapContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  showMapButton: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  showMapButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: height * 0.3,
  },
});
