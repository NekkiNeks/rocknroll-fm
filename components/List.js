import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {useGlobalContext} from './context';

// components
import ListItem from './ListItem';

// code
export default function List() {
  const {state} = useGlobalContext();
  const {title} = state;
  const url =
    'https://a6.radioheart.ru/api/json?userlogin=user8046&count=20&api=lasttrack';
  const [trackList, setTrackList] = useState([]);
  async function getTracksData() {
    let responce = await fetch(url);
    responce = await responce.json();
    setTrackList(responce);
  }

  useEffect(() => {
    getTracksData().then(console.log('fetched'));
  }, [title]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Последнее в эфире</Text>
      <ScrollView style={styles.scrollContainer} overScrollMode={'never'}>
        {trackList.map(item => {
          if (item.name === `Rock'n'Roll FM`) {
            return null;
          }
          return <ListItem key={item.name} name={item.name} time={item.time} />;
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
  header: {
    marginTop: 15,
    marginBottom: 25,
    color: '#fff',
    fontSize: 20,
  },
});
