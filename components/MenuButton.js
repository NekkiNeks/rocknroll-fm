import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors, fonts} from './theme';

export default function MenuButton({text, onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    paddingLeft: 50,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.geometrical,
    color: colors.white,
  },
});
