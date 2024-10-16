import React from 'react';
import { View, StyleSheet } from 'react-native';
import color from '../styles/colors';

export default function Usuarios() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: color.bg,
    flex: 1,
  },
});
