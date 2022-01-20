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

  if (state.loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: cover}} style={styles.cover} />
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
