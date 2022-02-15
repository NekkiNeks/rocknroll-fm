import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {State} from 'react-native-track-player';

//Components
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from './Spinner';

//State
import {useGlobalContext} from './context';

//Code
export default function Player() {
  const {playStream, pauseStream, toggleSearchMenu, state} = useGlobalContext();
  const {title, artist, cover, isPlaying, firstPlay, playerState, playerMode} =
    state;

  //Get height of info container
  const [infoHeight, setInfoHeight] = useState(0);
  function getInfoHeight(e) {
    const {height} = e.nativeEvent.layout;
    setInfoHeight(height);
  }

  const isLoading =
    playerMode === 'radio' &&
    (playerState === State.Buffering ||
      playerState === State.Connecting ||
      playerState === 'buffering' ||
      playerState === 'loading');

  return (
    <View style={styles.container}>
      {/* Image container */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>
            <Spinner />
          </Text>
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image
            source={cover ? {uri: cover} : require('../assets/logo.jpg')}
            style={styles.cover}
          />
        </View>
      )}

      {/* info container */}
      {!firstPlay && (
        <View style={styles.infoContainer} onLayout={getInfoHeight}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.artist}>{artist}</Text>
          {title && artist && (
            <TouchableOpacity
              onPress={() => toggleSearchMenu(true)}
              style={[styles.searchButton, {height: infoHeight}]}>
              <Icon name={'search'} size={25} color={'#fff'} />
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
          {!isPlaying ? (
            <Icon
              name={'play-arrow'}
              size={firstPlay ? 120 : 60}
              color={'#fff'}
            />
          ) : (
            <Icon name={'pause'} size={60} color={'#fff'} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

//Get width of phone
const fullWidth = Dimensions.get('window').width; //full width
const croppedWidth = fullWidth; // REMOVE LATER

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#000',
  },
  imageContainer: {
    height: croppedWidth,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: croppedWidth,
  },
  cover: {
    resizeMode: 'cover',
    marginBottom: 20,
    width: croppedWidth,
    height: croppedWidth,
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
    paddingRight: 20,
  },
  buttonsContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth,
  },
});
