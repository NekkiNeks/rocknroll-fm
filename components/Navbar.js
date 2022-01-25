import React from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function Navbar() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text>Button 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Button 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Button 3</Text>
      </TouchableOpacity>
    </View>
  );
}

const maxHeight = Dimensions.get('window').height;
const containerHeight = (maxHeight * 8) / 100;

const styles = StyleSheet.create({
  container: {
    height: containerHeight,
    flexDirection: 'row',
    backgroundColor: 'tomato',
  },
  button: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
