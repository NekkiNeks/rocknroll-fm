import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PodcastsMenu from './PodcastsMenu';
import Podcasts from './Podcasts';
import PodcastsStackHeader from './PodcastsStackHeader';
import {strings} from '../localization/localization';

const localization = strings.podcastsCategories;

//components
const Stack = createNativeStackNavigator();

export default function PodcastsRouter() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        header: props => <PodcastsStackHeader {...props} />,
      }}>
      <Stack.Screen name={strings.podcasts} component={PodcastsMenu} />
      <Stack.Screen name={localization.headlinerSimple} component={Podcasts} />
      <Stack.Screen name={localization.neshow} component={Podcasts} />
      <Stack.Screen name={localization.vinilomania} component={Podcasts} />
    </Stack.Navigator>
  );
}
