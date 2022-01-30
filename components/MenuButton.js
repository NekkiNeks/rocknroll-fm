import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
export default function MenuButton({text}) {
  return (
    <TouchableOpacity style={styles.button}>
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
    fontSize: 16,
    color: '#fff',
  },
});
