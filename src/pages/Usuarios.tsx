import React from 'react';
import { View, StyleSheet } from 'react-native';
import color from '../styles/colors';
import HeaderUser from '../components/header/HeaderUser';

export default function Usuarios() {
  return (
    <View style={styles.container}>
      <HeaderUser />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: color.bg,
    flex: 1,
  },
});
