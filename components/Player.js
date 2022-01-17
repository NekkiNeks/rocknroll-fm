import React, {useEffect} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {useGlobalContext} from './context';

export function Player(style) {
  const {TrackPlayer, startPlayer, playStream, state, testReducer} =
    useGlobalContext();

  useEffect(() => {
    startPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {title, artist} = state.trackInfo;

  if (state.loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={style}>
      <Text style={styles.title}>Song name: {title}</Text>
      <Text style={styles.artist}>Artist: {artist}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => playStream()} title={'play'}>
          <Text>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TrackPlayer.pause()}>
          <Text>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TrackPlayer.stop()}>
          <Text>Stop</Text>
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

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  artist: {
    fontSize: 15,
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'tomato',
    textAlign: 'center',
    width: 50,
  },
});
