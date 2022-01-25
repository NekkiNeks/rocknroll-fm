import React from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useGlobalContext} from './context';

export function Player() {
  const {playStream, pauseStream, state, testReducer} = useGlobalContext();

  const {title, artist, cover, isPlaying} = state;

  // cover = cover ? {uri: cover} : require('../assets/logo.jpg');

  if (state.loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cover ? (
        <Image source={{uri: cover}} style={styles.cover} />
      ) : (
        <Image source={require('../assets/logo.jpg')} style={styles.cover} />
      )}
      {/* <Image source={cover} style={styles.cover} /> */}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => {
            if (!isPlaying) {
              return playStream();
            }
            return pauseStream();
          }}
          title={'play'}>
          <Text style={styles.buttonText}>{isPlaying ? 'pause' : 'play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            testReducer();
            console.log(state);
          }}>
          <Text style={styles.buttonText}>TEST REDUCER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const fullWidth = Dimensions.get('window').width - 50; //full width

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#111',
    flexGrow: 1,
  },
  cover: {
    width: fullWidth,
    height: fullWidth,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
  },
  artist: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    // textAlign: 'center',
    // width: 50,
  },
});
