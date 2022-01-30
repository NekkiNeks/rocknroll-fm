import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ListItem({name, time}) {
  const [artist, title] = name.split(' - ');
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, styles.title]}>{title}</Text>
        <Text style={[styles.text, styles.artist]}>{artist}</Text>
      </View>
      <Text style={[styles.text, styles.time]}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    marginTop: 10,
  },
  text: {
    color: '#fff',
  },
  title: {
    fontSize: 15,
  },
  artist: {
    fontSize: 10,
  },
  time: {
    fontSize: 12,
  },
});
