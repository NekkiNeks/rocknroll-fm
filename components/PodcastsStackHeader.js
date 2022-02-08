import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function PodcastsStackHeader() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon name="back" size={25} color={'#fff'} />
        <Text style={styles.text}>CUSTOM HEADER TEXT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    height: 40,
    paddingTop: 15,
    paddingBottom: 25,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});
