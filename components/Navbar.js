import React from 'react';
import {Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import {useGlobalContext} from './context';

export default function Navbar({state, navigation}) {
  const {toggleMenu} = useGlobalContext();

  const activeColor = '#eb7209';
  const inactiveColor = '#4d4d4d';

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => toggleMenu(true)}>
        <Icon name={'menu'} size={40} color={'#4d4d4d'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Player')}>
        <Icon
          name={'radio'}
          size={35}
          color={state.index === 0 ? activeColor : inactiveColor}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PodcastsMenu')}>
        <IconAwesome
          name={'podcast'}
          size={30}
          color={state.index === 1 ? activeColor : inactiveColor}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('List')}>
        <Icon
          name={'queue-music'}
          size={45}
          color={state.index === 2 ? activeColor : inactiveColor}
        />
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
