import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';

//components
import Podcast from './Podcast';
import Spinner from './Spinner';

export default function Podcasts({route}) {
  const {path} = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [podcasts, setPodcasts] = useState([]);

  async function getPodcasts() {
    try {
      let res = await fetch(`http://192.168.1.37:6666/${path}`);
      res = await res.json();
      setPodcasts(res);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.warn(err.message);
    }
  }

  useEffect(() => {
    getPodcasts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>
          <Spinner />;
        </Text>
      </View>
    );
  } else if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>
          Проблемы с сервером, проверьте свое подключение к интернету и
          попробуйте перезапустить приложение.
        </Text>
      </View>
    );
  } else {
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
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: '7%',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorText: {
    color: '#fff',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});
