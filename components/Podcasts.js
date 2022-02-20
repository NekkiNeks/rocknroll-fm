import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import {colors} from './theme';

//components
import Podcast from './Podcast';
import Spinner from './Spinner';
import {strings} from '../localization/localization';

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
      console.log(err.message);
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
        <Text style={styles.errorText}>{strings.error}</Text>
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
    backgroundColor: colors.black,
    paddingHorizontal: '7%',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.black,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  errorText: {
    color: colors.white,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});
