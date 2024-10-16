import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import color from '../styles/colors';

export default function Estoque() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: color.bg,
    flex: 1,
  },
});
