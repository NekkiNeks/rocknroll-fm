import React from 'react';
import {Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useGlobalContext} from './context';

export default function Navbar({state, descriptors, navigation}) {
  const {toggleMenu} = useGlobalContext();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => toggleMenu(true)}>
        <Icon name={'menu'} size={40} color={'#4d4d4d'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Player')}>
        <Icon name={'radio'} size={35} color={'#eb7209'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('List')}>
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
  },
  button: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
