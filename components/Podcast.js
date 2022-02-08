import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Slider from '@react-native-community/slider';

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
}) {
  const {playPodcast, state} = useGlobalContext();
  const {currentPodcast} = state;

  const thisPodcastPlaying = currentPodcast === id;

  const stringDuration = (duration / 60000).toFixed();

  async function addPodcast() {
    let url = await fetch(`http://192.168.1.37:6666/podcasts/${id}`);
    url = await url.json();
    const Track = {
      url: url, // Load media from the network
      title: title,
      artist: 'RNRFM',
      album: 'podcast',
      genre: 'RocknRoll',
      date: date, // RFC 3339
      artwork: image, // Load artwork from the network
      duration: duration / 1000, // Duration in seconds
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
          <TouchableOpacity style={{alignSelf: 'flex-end'}}>
            <Icon name={'share'} size={20} color={'#999'} />
          </TouchableOpacity>
          <View style={styles.playButtonContainer}>
            <Text style={styles.duration}>{stringDuration} мин.</Text>

            <TouchableOpacity
              onPress={() => {
                if (!thisPodcastPlaying) {
                  addPodcast();
                }
              }}>
              <Icon name={'play-circle-filled'} size={30} color={'#fff'} />
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
  const {position} = useGlobalContext();

  const [playing, setPlaying] = useState(true);

  function handlePress() {
    if (playing) {
      TrackPlayer.pause();
      setPlaying(false);
    } else {
      TrackPlayer.play();
      setPlaying(true);
    }
  }
  return (
    <View style={styles.player}>
      <ProgressBar />
      <View style={styles.playerButtons}>
        <TouchableOpacity
          style={styles.playerButton}
          onPress={async () => await TrackPlayer.seekTo(position - 15)}>
          <Icon name={'replay-30'} size={30} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playerButton} onPress={handlePress}>
          {playing ? (
            <Icon name={'pause'} size={55} color={'#fff'} />
          ) : (
            <Icon name={'play-arrow'} size={55} color={'#fff'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.playerButton}
          onPress={async () => await TrackPlayer.seekTo(position + 15)}>
          <Icon name={'forward-30'} size={30} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ProgressBar() {
  const {position, duration} = useGlobalContext();

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
        thumbTintColor="#eb7209"
        minimumTrackTintColor="#eb7209"
        maximumTrackTintColor="#FFFFFF"
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
    backgroundColor: '#111',
    borderRadius: 7,
    marginTop: 10,
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
    // marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    fontWeight: '600',
  },
  duration: {
    marginRight: 20,
    fontSize: 12,
    color: '#999',
  },
  text: {
    color: '#fff',
  },

  //active
  activePart: {
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#aaa',
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
    marginHorizontal: 5,
    fontSize: 10,
    color: '#fff',
  },
});
