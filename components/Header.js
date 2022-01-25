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
    <View style={styles.container}>
      <TouchableOpacity style={styles.link}>
        <Image
          source={require('../assets/logo.jpg')}
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>ПЕРВОЕ {'\n'} МУЖСКОЕ РАДИО</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.link}>
          <Text style={{color: '#eee'}}>Share</Text>
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
