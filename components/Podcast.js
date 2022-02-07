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
    let url = await fetch(`http://10.0.2.2:6666/podcasts/${id}`);
    url = await url.json();
    const Track = {
      url: url, // Load media from the network
      title: title,
      artist: 'RNRFM',
      album: 'podcast',
      genre: 'RocknRoll',
      date: '2014-05-20T07:00:00+00:00', // RFC 3339
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

  console.log(position, buffered, duration);

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
    <View>
      <View style={styles.playerButtons}>
        <TouchableOpacity onPress={() => TrackPlayer.seekTo(position - 15)}>
          <Icon name={'replay-30'} size={30} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress}>
          {playing ? (
            <Icon name={'pause'} size={55} color={'#fff'} />
          ) : (
            <Icon name={'play-arrow'} size={55} color={'#fff'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TrackPlayer.seekTo(position + 15)}>
          <Icon name={'forward-30'} size={30} color={'#fff'} />
        </TouchableOpacity>
      </View>
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
  text: {
    color: '#fff',
  },
  title: {
    paddingRight: 5,
    paddingLeft: 10,
    fontSize: 14,
    flex: 1,
    fontWeight: '600',
  },
  activePart: {
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#aaa',
  },
  duration: {
    marginTop: 10,
    fontSize: 12,
  },
  playerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
