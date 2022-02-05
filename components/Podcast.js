import React from 'react';
import {TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {useGlobalContext} from './context';

export default function Podcast({
  title,
  description,
  duration,
  image,
  date,
  id,
}) {
  const {playPodcast} = useGlobalContext();

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
    playPodcast(Track);
  }
  return (
    <TouchableOpacity style={styles.container} onPress={addPodcast}>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={[styles.text, styles.title]}>{title}</Text>
      <Text style={[styles.text, styles.description]}>{description}</Text>
      <Text style={[styles.text, styles.duration]}>{duration / 60000}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    color: '#fff',
  },
  title: {
    fontSize: 20,
  },
  description: {
    fontSize: 14,
  },
});
