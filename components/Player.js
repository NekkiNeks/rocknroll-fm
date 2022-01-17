import React, {useEffect} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {useGlobalContext} from './context';

export function Player(style) {
  const {loading, TrackPlayer, startPlayer, trackInfo} = useGlobalContext();

  useEffect(() => {
    startPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {title, artist} = trackInfo;

  if (loading) {
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
        <TouchableOpacity
          onPress={() => TrackPlayer.play()}
          title={'play'}
          style={styles.button}>
          <Text>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TrackPlayer.pause()}>
          <Text>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TrackPlayer.stop()}>
          <Text>Stop</Text>
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
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'tomato',
    textAlign: 'center',
    width: 50,
  },
});
