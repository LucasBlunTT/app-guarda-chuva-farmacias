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

export default function MovimentMotorista() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getMovements();
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

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {loading ? (
          <Text style={styles.loadingText}>Carregando...</Text>
        ) : (
          <FlatList
            data={movements}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <EntregasMotorista item={item} />}
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
