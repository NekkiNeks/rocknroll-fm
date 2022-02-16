import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {useGlobalContext} from './context';
import {strings} from '../localization/localization';
import {colors, fonts} from './theme';

// components
import ListItem from './ListItem';
import Spinner from './Spinner';

// code
export default function List() {
  const {state} = useGlobalContext();
  const {title} = state;
  const url =
    'https://a6.radioheart.ru/api/json?userlogin=user8046&count=40&api=lasttrack';
  const [trackList, setTrackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getTracksData() {
    try {
      let responce = await fetch(url);
      responce = await responce.json();
      setTrackList(responce);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err.message);
    }
  }

  useEffect(() => {
    getTracksData().then(console.log('List of songs has been fetched.'));
  }, [title]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{strings.last}</Text>
        <View style={styles.loadingContainer}>
          <Text>
            <Spinner />
          </Text>
        </View>
      </View>
    );
  } else if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{strings.last}</Text>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>
            Проблемы с сервером, попробуйте перезапустить приложение.
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{strings.last}</Text>
        <ScrollView style={styles.scrollContainer} overScrollMode={'never'}>
          {trackList.map(item => {
            if (item.name === "Rock'n'Roll FM") {
              return null;
            }
            return (
              <ListItem key={item.name} name={item.name} time={item.time} />
            );
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
    paddingHorizontal: '10%',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    marginTop: 15,
    marginBottom: 25,
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.geometrical,
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
    fontFamily: fonts.geometrical,
  },
});
