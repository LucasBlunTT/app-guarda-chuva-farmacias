import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import color from '../../styles/colors';

export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require('../../images/umbrella-logo.png')}
        style={{ width: 150, height: 150 }}
      />
      <Text style={styles.textOne}>UMBRELLA</Text>
      <Text style={styles.textTwo}>FARMACIAS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOne: {
    color: 'white',
    fontSize: 40,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  textTwo: {
    marginLeft: 20,
    color: 'white',
    fontSize: 26,
    borderRadius: 10,
  },
});
