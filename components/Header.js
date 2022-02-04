import React from 'react';
import {useGlobalContext} from './context';
import {
  Dimensions,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Header() {
  const {state, testReducer} = useGlobalContext();
  const {firstPlay} = state;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.link}>
        {!firstPlay && (
          <Image
            source={require('../assets/logo.jpg')}
            style={styles.logoImage}
          />
        )}
      </TouchableOpacity>
      <View style={styles.textContainer}>
        {!firstPlay && (
          <Text style={styles.text}>ПЕРВОЕ {'\n'} МУЖСКОЕ РАДИО</Text>
        )}
      </View>
      <View>
        <TouchableOpacity style={styles.link} onPress={testReducer}>
          <Icon name={'share'} size={25} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const maxHeight = Dimensions.get('window').height;
const containerHeight = (maxHeight * 8) / 100;

const styles = StyleSheet.create({
  container: {
    height: containerHeight,
    flexDirection: 'row',
    backgroundColor: '#000',
  },
  logoImage: {
    width: containerHeight - 13,
    height: containerHeight - 13,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.3)',
  },
  textContainer: {
    flexGrow: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: containerHeight,
    height: containerHeight,
  },
});
