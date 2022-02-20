import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from './theme';

export default function ListItem({name, time}) {
  let [artist, title] = name.split(' - ');
  title = title.length > 30 ? title.slice(0, 30) + '...' : title;
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
    backgroundColor: colors.black,
    marginTop: 10,
  },
  text: {
    color: colors.white,
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
