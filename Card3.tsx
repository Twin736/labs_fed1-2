import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ICard {
  name: string;
  image: string;
  firstEpisode: string;
  onPress: () => void;
}

export function Card({ name, image, firstEpisode, onPress }: ICard): React.JSX.Element {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.episode}>Первый эпизод: {firstEpisode}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  image: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  name: { fontSize: 16, fontWeight: 'bold' },
  episode: { fontSize: 14, color: '#666' },
});
