import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import EntregasMotorista from '../components/moviments/EntregasMotorista';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MovimentMotorista() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [motoristaLogado, setMotoristaLogado] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getMovements();
      getLocalStorage();
    }, []),
  );

  async function getMovements() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API}/movements`,
      );
      setMovements(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getLocalStorage() {
    try {
      const motoristaLogado = JSON.parse(await AsyncStorage.getItem('users'));
      setMotoristaLogado(motoristaLogado);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {loading ? (
          <Text style={styles.loadingText}>Carregando...</Text>
        ) : (
          <FlatList
            data={movements}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <EntregasMotorista
                item={item}
                motoristaNome={motoristaLogado.name}
                getMovements={getMovements}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#121212',
  },
  body: {
    flex: 1,
    paddingHorizontal: 15,
  },
  loadingText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#A71412',
    paddingVertical: 15,
    alignItems: 'center',
    margin: 15,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
