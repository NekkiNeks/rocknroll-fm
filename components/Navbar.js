import React from 'react';
import {Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Navbar() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Icon name={'menu'} size={40} color={'#4d4d4d'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name={'radio'} size={35} color={'#eb7209'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name={'queue-music'} size={45} color={'#4d4d4d'} />
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
    // backgroundColor: 'tomato',
  },
  button: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
