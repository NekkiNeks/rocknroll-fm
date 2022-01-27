import React, {useState} from 'react';
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
  const {playStream, pauseStream, state} = useGlobalContext();

  const {title, artist, cover, isPlaying, firstPlay} = state;

  const [infoHeight, setInfoHeight] = useState(0);

  function getInfoHeight(e) {
    const {height} = e.nativeEvent.layout;
    setInfoHeight(height);
  }

  if (state.loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Image container */}
      <View style={styles.imageContainer}>
        {cover ? (
          <Image source={{uri: cover}} style={styles.cover} />
        ) : (
          <Image source={require('../assets/logo.jpg')} style={styles.cover} />
        )}
      </View>

      {/* info container */}
      {!firstPlay && (
        <View style={styles.infoContainer} onLayout={getInfoHeight}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.artist}>{artist}</Text>
          {title && artist && (
            <TouchableOpacity
              onPress={() => console.log('searching')}
              style={[styles.searchButton, {height: infoHeight}]}>
              <Text style={{color: '#fff'}}>search</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* buttons container */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => {
            if (!isPlaying) {
              return playStream();
            }
            return pauseStream();
          }}>
          <Text style={styles.buttonText}>{isPlaying ? 'pause' : 'play'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const fullWidth = Dimensions.get('window').width; //full width
const croppedWidth = fullWidth - 50;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#111',
    flexGrow: 1,
  },
  imageContainer: {
    height: croppedWidth,
  },
  cover: {
    // flex: 1,
    width: croppedWidth,
    height: croppedWidth,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  infoContainer: {
    width: croppedWidth,
    marginTop: 20,
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
  searchButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexGrow: 1,
    width: fullWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});
