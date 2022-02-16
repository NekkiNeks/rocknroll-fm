import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors, fonts} from './theme';

export default function PodcastsStackHeader({route, navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="arrow-back-ios" size={25} color={colors.white} />
      </TouchableOpacity>
      <Text style={styles.text}>{route.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.black,
    paddingTop: 15,
    paddingBottom: 25,
  },
  text: {
    marginLeft: 10,
    color: colors.white,
    fontSize: 20,
    // fontFamily: fonts.geometrical,
  },
  backButton: {
    paddingLeft: 20,
    height: '100%',
  },
});
