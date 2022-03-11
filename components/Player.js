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
import {colors} from './theme';
import {strings} from '../localization/localization';

//Components
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from './Spinner';

//State
import {useGlobalContext} from './context';

//Code
export default function Player() {
  const {playStream, pauseStream, toggleSearchMenu, updateSearchQueue, state} =
    useGlobalContext();
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

  if (firstPlay) {
    return (
      <View style={styles.container}>
        {/* logo section */}
        <View style={styles.imageContainer}>
          <Image source={require('../assets/logo.jpg')} style={styles.cover} />
        </View>

        {/* button section */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => playStream()}>
            <Icon name={'play-arrow'} size={140} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (isLoading) {
    return (
      <View style={styles.container}>
        {/* loading spinner */}
        <View style={styles.loadingContainer}>
          <Text>
            <Spinner />
          </Text>
        </View>

        {/* info section */}
        <View style={styles.buttonsContainer}>
          <Text style={styles.title}>{strings.loading}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {/* cover section */}
        <View style={styles.imageContainer}>
          <Image
            source={cover ? {uri: cover} : require('../assets/placeholder.jpg')}
            style={styles.cover}
          />
        </View>

        {/* info section */}
        <View style={styles.infoContainer} onLayout={getInfoHeight}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.artist}>{artist}</Text>
          {title && artist && (
            <TouchableOpacity
              onPress={() => {
                toggleSearchMenu(true);
                updateSearchQueue(`${title} - ${artist}`);
              }}
              style={[styles.searchButton, {height: infoHeight}]}>
              <Icon name={'search'} size={25} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>

        {/* buttons container */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => {
              isPlaying ? pauseStream() : playStream();
            }}>
            <Icon
              name={isPlaying ? 'pause' : 'play-arrow'}
              size={70}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

//Get width of phone
const fullWidth = Dimensions.get('window').width; //full width
const croppedWidth = fullWidth - 50; // REMOVE LATER

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.black,
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
    width: fullWidth - 20,
    marginTop: 20,
  },
  title: {
    color: colors.white,
    fontSize: 17,
    textAlign: 'center',
  },
  artist: {
    color: colors.white,
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
