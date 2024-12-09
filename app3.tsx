import React, { useEffect, useState } from 'react';
import { Text, Image, SafeAreaView, StyleSheet } from 'react-native';
import axios from 'axios';
import { StackParamList } from '../type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Character } from '../interfaces';

type Props = NativeStackScreenProps<StackParamList, 'Character'>;

function Characterscreen({ route }: Props): React.JSX.Element {
  const { id } = route.params;
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) {
    return <Text>Загрузка...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.text}>Имя: {character.name}</Text>
      <Text style={styles.text}>Статус: {character.status}</Text>
      <Text style={styles.text}>Вид: {character.species}</Text>
      <Text style={styles.text}>Пол: {character.gender}</Text>
      <Text style={styles.text}>Происхождение: {character.origin.name}</Text>
      <Text style={styles.text}>Местоположение: {character.location.name}</Text>
    </SafeAreaView>
  );
}

export default Characterscreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  image: { width: 200, height: 200, alignSelf: 'center', marginBottom: 16 },
  text: { fontSize: 18, marginBottom: 8 },
});
