import React from 'react';
import {useGlobalContext} from './context';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {strings} from '../localization/localization';

export default function Header() {
  const {testReducer, shareMessage} = useGlobalContext();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.link} onPress={testReducer}>
        <Image
          source={require('../assets/logo.jpg')}
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{strings.title}</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.link}
          onPress={() =>
            shareMessage(
              'Здесь будет ссылка на приложение, а пока лишь ссылка на сайт: https://rnr.fm',
            )
          }>
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
