import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';

//components
import Podcast from './Podcast';
import Spinner from './Spinner';

export default function Podcasts() {
  const [loading, setLoading] = useState(true);
  const [podcasts, setPodcasts] = useState([]);

  async function getPodcasts() {
    let res = await fetch('http://192.168.1.37:6666/podcasts');
    res = await res.json();
    setPodcasts(res);
    setLoading(false);
  }

  useEffect(() => {
    getPodcasts().catch(err => console.log(err.message));
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>
          <Spinner />;
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} overScrollMode={'never'}>
        {podcasts.map(item => {
          return <Podcast {...item} key={item.id} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '7%',
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    transform: {
      rotateX: '120deg',
    },
  },
});
