import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';

export default function Header() {
  // Criar uma referência para o valor animado
  const rotateValue = useRef(new Animated.Value(0)).current;

  // Função para rodar infinitamente
  const startRotation = () => {
    rotateValue.setValue(0); // Resetar o valor para 0
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1, // Valor final da animação
        duration: 50000, // Tempo da rotação em milissegundos (5 segundos neste exemplo)
        easing: Easing.linear, // Efeito de rotação constante
        useNativeDriver: true, // Melhor desempenho com animações
      })
    ).start();
  };

  // Chamar a função de rotação infinita quando o componente for montado
  useEffect(() => {
    startRotation();
  }, []);

  // Interpolar o valor de rotação para um ângulo (0 a 360 graus)
  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotações de 0 a 360 graus
  });

  // Aplicar a transformação de rotação ao estilo da imagem
  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  return (
    <View style={styles.header}>
      <Animated.Image
        source={require('../../images/umbrella-logo.png')}
        style={[{ width: 150, height: 150 }, animatedStyle]}
      />
      <Text style={styles.textOne}>UMBRELLA</Text>
      <Text style={styles.textTwo}>FARMACIAS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOne: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Roboto_400Regular',
  },
  textTwo: {
    marginLeft: 20,
    color: 'white',
    fontSize: 26,
    fontFamily: 'Roboto_400Regular',
  },
});
