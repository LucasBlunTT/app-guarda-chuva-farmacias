import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const { height } = Dimensions.get('window');

export default function EntregasMotorista({
  item,
  motoristaNome,
  getMovements,
}) {
  const [showMap, setShowMap] = useState(false);

  const startDelivery = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permissão negada', 'Permita o uso da câmera para continuar');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      await enviarImagem(item.id, imageUri, 'start');
    }
  };

  const endDelivery = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permissão negada', 'Permita o uso da câmera para continuar');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      await enviarImagem(item.id, imageUri, 'end');
    }
  };

  const enviarImagem = async (id, uri, action) => {
    const formData = new FormData();
    const imageBlob = await (await fetch(uri)).blob();
    formData.append('file', {
      uri: uri,
      type: imageBlob.type || 'image/jpeg',
      name: `${action}.jpg`,
    });
    formData.append('motorista', motoristaNome);
    const endpoint = `${process.env.EXPO_PUBLIC_API}/movements/${id}/${action}`;

    try {
      await axios.put(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert(
        'Sucesso',
        `Entrega ${
          action === 'start' ? 'iniciada' : 'finalizada'
        } com sucesso!`,
      );
      getMovements();
    } catch (error) {
      Alert.alert(
        'Erro',
        `Falha ao ${action === 'start' ? 'iniciar' : 'finalizar'} a entrega`,
      );
      console.error(error);
    }
  };

  const getStatusBackgroundColor = () => {
    switch (item.status) {
      case 'created':
        return '#4B0082'; // Roxo escuro para novo
      case 'em transito':
        return '#FF8C00'; // Laranja para em trânsito
      case 'coleta finalizada':
        return '#008000'; // Verde para finalizada
      default:
        return '#1A1A19'; // Cinza escuro para outros status
    }
  };

  return (
    <View
      style={[
        styles.movementCard,
        { borderColor: '#4B0082', backgroundColor: getStatusBackgroundColor() },
      ]}
    >
      <View style={styles.movementInfo}>
        <Text style={styles.movementTitle}>Produto: {item.produto.nome}</Text>
        <Text style={styles.movementText}>ID: {item.id}</Text>
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
      {item.status === 'created' ? (
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
          onPress={startDelivery}
        >
          <Text style={styles.showMapButtonText}>Iniciar Entrega</Text>
        </TouchableOpacity>
      ) : item.status === 'em transito' ? (
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: 'black' }]}
          onPress={endDelivery}
        >
          <Text style={styles.showMapButtonText}>Finalizar Entrega</Text>
        </TouchableOpacity>
      ) : null}
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
              coordinate={item.origem}
              title="Origem"
              description={item.origem.nome}
            />
            <Marker
              coordinate={item.destino}
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
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 2,
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
  actionButton: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
});
