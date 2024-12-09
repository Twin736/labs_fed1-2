import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

interface ICard {
  name: string;
  image: string;
  firstEpisode: string;
}

export const Card = ({ name, image, firstEpisode }: ICard) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.description}>Впервые появился в {firstEpisode}</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 4,
    color: '#555',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
});
