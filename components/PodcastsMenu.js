import React from 'react';
import {TouchableOpacity, StyleSheet, Text, ScrollView} from 'react-native';

export default function PodcastsMenu({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Хедлайнер', {path: 'headliner'})}>
        <Text style={styles.text}>{'Проект\nХедлайнер'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Не Шоу', {path: 'neshow'})}>
        <Text style={styles.text}>Не Шоу</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Виниломания', {path: 'vinilomania'})
        }>
        <Text style={styles.text}>Виниломания</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: '#aaa',
    height: 100,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 22,
    color: '#000',
  },
});
