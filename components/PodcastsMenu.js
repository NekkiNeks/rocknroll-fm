import React from 'react';
import {TouchableOpacity, StyleSheet, Text, ScrollView} from 'react-native';
import {strings} from '../localization/localization';
import {colors} from './theme';

const localization = strings.podcastsCategories;

export default function PodcastsMenu({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(localization.headlinerSimple, {path: 'headliner'})
        }>
        <Text style={styles.text}>{localization.headliner}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(localization.neshow, {path: 'neshow'})
        }>
        <Text style={styles.text}>{localization.neshow}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(localization.vinilomania, {path: 'vinilomania'})
        }>
        <Text style={styles.text}>{localization.vinilomania}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: '#aaa', // change later
    justifyContent: 'flex-end',
    height: 150,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 26,
    color: colors.black,
  },
});
