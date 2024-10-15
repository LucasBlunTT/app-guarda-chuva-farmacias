import { View, StyleSheet } from 'react-native';
import React from 'react';

export default function HeaderHome() {
  return <View style={styles.header}></View>;
}

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
