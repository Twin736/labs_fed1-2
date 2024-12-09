import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Card } from './components/Card';
import axios from 'axios';
import { Character } from './/interfaces';

function App(): React.JSX.Element {
  const [users, setUsers] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <SafeAreaView>
      {isLoading ? (
      <Text style={{ fontSize: 42 }}>Загрузка...</Text>
      ) : (
        <FlatList
          data={users}
          refreshing={isLoading}
          onRefresh={handleGetUser}
          renderItem={(user) => (
            <Card
              name={user.item.name}
              image={user.item.image}
              firstEpisode={user.item.firstEpisode}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
