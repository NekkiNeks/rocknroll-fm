import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import {strings} from '../localization/localization';
import {colors} from './theme';

//components
import {useGlobalContext} from './context';
import Icon from 'react-native-vector-icons/MaterialIcons';

//code
export default function Podcast({
  title,
  description,
  duration,
  image,
  date,
  id,
  shareLink,
  audioLink,
}) {
  const {playPodcast, state, shareMessage} = useGlobalContext();
  const {currentPodcast} = state;

  const thisPodcastPlaying = currentPodcast === id;

  const stringDuration = (duration / 60).toFixed();

  const messageForShare = `${strings.podcastMessage}${shareLink}`;

  async function addPodcast() {
    const Track = {
      url: audioLink, // Load media from the network
      title: title,
      artist: 'RNRFM',
      album: 'podcast',
      genre: 'RocknRoll',
      date: date, // RFC 3339
      artwork: image, // Load artwork from the network
      duration: duration, // Duration in seconds
    };
    console.log('track is ready');
    playPodcast(Track, id);
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={{uri: image}} style={styles.image} />
        <Text style={[styles.text, styles.title]}>{title}</Text>
      </View>
      {thisPodcastPlaying ? (
        <ActivePart description={description} />
      ) : (
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => shareMessage(messageForShare)}>
            <Icon name={'share'} size={20} color={colors.gray} />
          </TouchableOpacity>
          <View style={styles.playButtonContainer}>
            <Text style={styles.duration}>{stringDuration} мин.</Text>

            <TouchableOpacity
              onPress={() => {
                if (!thisPodcastPlaying) {
                  addPodcast();
                }
              }}>
              <Icon
                name={'play-circle-filled'}
                size={30}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

function ActivePart({description}) {
  return (
    <View style={styles.activePart}>
      <Text style={[styles.text, styles.description]}>{description}</Text>
      <PodcastPlayer />
    </View>
  );
}

function PodcastPlayer() {
  const {position} = useProgress();
  const {state, togglePodcastPlaying} = useGlobalContext();
  const {podcastPlaying} = state;

  function handlePress() {
    if (podcastPlaying) {
      TrackPlayer.pause();
      togglePodcastPlaying(false);
    } else {
      TrackPlayer.play();
      togglePodcastPlaying(true);
    }
  }
  return (
    <View style={styles.player}>
      <ProgressBar />
      <View style={styles.playerButtons}>
        <TouchableOpacity
          style={styles.playerButton}
          onPress={async () => await TrackPlayer.seekTo(position - 30)}>
          <Icon name={'replay-30'} size={30} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playerButton} onPress={handlePress}>
          {podcastPlaying ? (
            <Icon name={'pause'} size={55} color={colors.white} />
          ) : (
            <Icon name={'play-arrow'} size={55} color={colors.white} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.playerButton}
          onPress={async () => await TrackPlayer.seekTo(position + 30)}>
          <Icon name={'forward-30'} size={30} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ProgressBar() {
  const {position, duration} = useProgress();

  const positionString = new Date(position * 1000).toISOString().substr(14, 5);
  const durationString = new Date((duration - position) * 1000)
    .toISOString()
    .substr(14, 5);

  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressText}>{positionString}</Text>
      <Slider
        style={styles.bar}
        value={position}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor={colors.orange}
        minimumTrackTintColor={colors.orange}
        maximumTrackTintColor={colors.white}
        onSlidingComplete={async value => {
          await TrackPlayer.seekTo(value);
        }}
      />
      <Text style={styles.progressText}>{durationString}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkGray,
    borderRadius: 7,
    marginBottom: 10,
    padding: 15,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  playButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  shareButton: {
    alignSelf: 'flex-end',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  title: {
    paddingRight: 5,
    paddingLeft: 10,
    fontSize: 14,
    flex: 1,
    fontWeight: 'bold',
  },
  duration: {
    marginRight: 20,
    fontSize: 12,
    color: colors.lightGray,
  },
  text: {
    color: colors.white,
  },

  //active
  activePart: {
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: colors.lightGray,
  },

  //player
  player: {
    marginTop: 10,
  },
  playerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
  },
  playerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //progress
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    flex: 1,
    width: '100%',
    height: 40,
  },
  progressText: {
    width: 35,
    textAlign: 'center',
    fontSize: 10,
    color: colors.lightGray,
  },
});
