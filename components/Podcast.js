import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import TrackPlayer from 'react-native-track-player';

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
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (!thisPodcastPlaying) {
          addPodcast();
        }
      }}>
      <View style={styles.titleContainer}>
        <Image source={{uri: image}} style={styles.image} />
        <Text style={[styles.text, styles.title]}>{title}</Text>
      </View>
      <Text style={[styles.text, styles.duration]}>{stringDuration} мин.</Text>
      {thisPodcastPlaying && <ActivePart description={description} />}
    </TouchableOpacity>
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
  const {position, buffered, duration} = useGlobalContext();

  const [playing, setPlaying] = useState(true);

  // console.log(position, buffered, duration);

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
      <ProgressBar
        position={position}
        buffered={buffered}
        duration={duration}
      />
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

function ProgressBar({position, duration, buffered}) {
  const bufferedProgress = (buffered * 100) / duration;
  const positionProgress = (position * 100) / duration;

  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressText}>22:14</Text>
      <View style={styles.bar}>
        <View style={[styles.buffering, {width: `${bufferedProgress}%`}]} />
        <View style={[styles.playing, {width: `${positionProgress}%`}]} />
      </View>
      <Text style={styles.progressText}>44:02</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    borderRadius: 7,
    marginTop: 10,
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
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
    marginTop: 10,
    fontSize: 12,
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
    marginTop: 20,
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
    backgroundColor: '#555',
    flex: 1,
    width: '100%',
    height: 3,
  },
  playing: {
    backgroundColor: '#fff',
    position: 'absolute',
    height: 3,
  },
  buffering: {
    backgroundColor: '#aaa',
    position: 'absolute',
    height: 3,
  },
  progressText: {
    marginHorizontal: 10,
    fontSize: 10,
    color: '#fff',
  },
});
