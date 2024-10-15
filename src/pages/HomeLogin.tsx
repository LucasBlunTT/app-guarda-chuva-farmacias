import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/header/Header';
import color from '../styles/colors';

export default function Home() {
  const authContext = useContext(AuthContext); // Acessa o contexto
  const login = authContext?.login; // Pega a propriedade login

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <TouchableOpacity style={styles.buttonLogin} onPress={login}>
          <Text style={styles.textLogin}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.bg,
    flex: 1,
  },
  header: {
    backgroundColor: '#121212',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    backgroundColor: '#E2B616',
    color: '#121212',
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  textBody: {
    marginTop: 50,
    color: '#E2B616',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  buttonLogin: {
    backgroundColor: '#121212',
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontWeight: 'bold',
    marginTop: 20,
  },
  textLogin: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
