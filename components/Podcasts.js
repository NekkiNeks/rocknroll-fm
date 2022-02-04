import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  View,
} from 'react-native';

//components
import Podcast from './Podcast';

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);

  async function getPodcasts() {
    let res = await fetch('http://10.0.2.2:6666/podcasts');
    res = await res.json();
    // console.log(res);
    setPodcasts(res);
  }

  useEffect(() => {
    getPodcasts();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.crollContainer}>
        {podcasts.map(item => {
          return <Podcast {...item} key={item.id} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '10%',
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
});
