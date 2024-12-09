import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Feedscreen from './screen/Feedscreen';
import Characterscreen from './screen/Characterscreen';

export type RootStackParamList = {
  Home: undefined;
  Character: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Feedscreen}
          options={{ title: 'Лента новостей' }}
        />
        <Stack.Screen
          name="Character"
          component={Characterscreen}
          options={{ title: 'Персонаж' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
