import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function PodcastsStackHeader({route, navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="arrow-back-ios" size={25} color={'#fff'} />
      </TouchableOpacity>
      <Text style={styles.text}>{route.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingTop: 15,
    paddingBottom: 25,
  },
  text: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 20,
  },
  backButton: {
    paddingLeft: 20,
    height: '100%',
  },
});
