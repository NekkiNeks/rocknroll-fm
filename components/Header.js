import React from 'react';
import {
  Dimensions,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function Header() {
  return (
    <View style={style.container}>
      <TouchableOpacity style={style.link}>
        <Image source={require('../assets/logo.jpg')} style={style.logoImage} />
      </TouchableOpacity>
      <View style={style.textContainer}>
        <Text style={style.text}>ПЕРВОЕ {'\n'} МУЖСКОЕ РАДИО</Text>
      </View>
      <View>
        <TouchableOpacity style={style.link}>
          <Text style={{color: '#eee'}}>RNR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const maxHeight = Dimensions.get('window').height;
const containerHeight = (maxHeight * 10) / 100;

const style = StyleSheet.create({
  container: {
    height: containerHeight,
    flexDirection: 'row',
    backgroundColor: '#000',
  },
  logoImage: {
    width: containerHeight - 20,
    height: containerHeight - 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
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
