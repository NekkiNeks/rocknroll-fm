import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PodcastsMenu from './PodcastsMenu';
import Podcasts from './Podcasts';
import PodcastsStackHeader from './PodcastsStackHeader';

//components
const Stack = createNativeStackNavigator();

export default function PodcastsRouter() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'float',
        header: props => <PodcastsStackHeader {...props} />,
      }}>
      <Stack.Screen name="Home" component={PodcastsMenu} />
      <Stack.Screen name="Виниломания" component={Podcasts} />
      <Stack.Screen name="Не Шоу" component={Podcasts} />
      <Stack.Screen name="Хедлайнер" component={Podcasts} />
    </Stack.Navigator>
  );
}
