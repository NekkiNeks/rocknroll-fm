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
        <Image
          source={require('../assets/logo.jpg')}
          style={styles.coverPlaceholder}
        />
      )}
      {/* <Image source={cover} style={styles.cover} /> */}
      <Text style={styles.title}>Song name: {title}</Text>
      <Text style={styles.artist}>Artist: {artist}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => {
            if (!isPlaying) {
              return playStream();
            }
            return pauseStream();
          }}
          title={'play'}>
          <Text>{isPlaying ? 'pause' : 'play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            testReducer();
            console.log(state);
          }}>
          <Text>TEST REDUCER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const fullWidth = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cover: {
    alignSelf: 'stretch',
    height: fullWidth,
    // resizeMode: 'contain',
  },
  coverPlaceholder: {
    // alignSelf: 'stretch',
    height: fullWidth,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  artist: {
    fontSize: 15,
    textAlign: 'center',
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'tomato',
    textAlign: 'center',
    width: 50,
  },
});
