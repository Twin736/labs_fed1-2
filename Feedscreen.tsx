import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { RootStackParamList } from '../App';
import { Character } from '../interfaces';
import { Card } from '../components/Card';

type FeedscreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

function Feedscreen(): React.JSX.Element {
  const [users, setUsers] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<FeedscreenNavigationProp>();

  const handleGetUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character');
      const characters: Character[] = response.data.results;

      const usersWithEpisodes = await Promise.all(
        characters.map(async (character) => {
          const firstEpisodeUrl = character.episode[0];
          const episodeResponse = await axios.get(firstEpisodeUrl);
          const firstEpisode = episodeResponse.data.name;
          return {
            ...character,
            firstEpisode,
          };
        })
      );

      setUsers(usersWithEpisodes);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>Загрузка...</Text>
      ) : (
        <FlatList
          data={users}
          refreshing={isLoading}
          onRefresh={handleGetUser}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card
              name={item.name}
              image={item.image}
              firstEpisode={item.firstEpisode || 'Unknown'}
              onPress={() => navigation.navigate('Character', { id: item.id })}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Feedscreen;
