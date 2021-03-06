import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors} from './theme';

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
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.white,
  },
});
