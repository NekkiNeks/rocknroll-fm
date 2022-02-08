import React from 'react';
import {TouchableOpacity, StyleSheet, Text, ScrollView} from 'react-native';

export default function PodcastsMenu({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Хедлайнер', {path: 'headliner'})}>
        <Text>Хедлайнер</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Не Шоу', {path: 'neshow'})}>
        <Text>Не Шоу</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Виниломания', {path: 'vinilomania'})
        }>
        <Text>Виниломания</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  button: {
    backgroundColor: '#aaa',
    height: 100,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});
