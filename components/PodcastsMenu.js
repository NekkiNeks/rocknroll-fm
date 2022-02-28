import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import {strings} from '../localization/localization';
import {colors} from './theme';

import Spinner from './Spinner';

const localization = strings.podcastsCategories;

export default function PodcastsMenu({navigation}) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getImage() {
    const imageSource = await require('../assets/podcast-background.jpg');
    setImage(imageSource);
    setLoading(false);
  }

  useEffect(() => {
    getImage();
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

  if (!loading) {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate(localization.headlinerSimple, {
              path: 'headliner',
            })
          }>
          <Image source={image} style={styles.backgroundImage} />
          <Text style={styles.text}>{localization.headliner}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate(localization.neshow, {path: 'neshow'})
          }>
          <Image source={image} style={styles.backgroundImage} />
          <Text style={styles.text}>{localization.neshow}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate(localization.vinilomania, {path: 'vinilomania'})
          }>
          <Image source={image} style={styles.backgroundImage} />
          <Text style={styles.text}>{localization.vinilomania}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    paddingHorizontal: 30,
  },
  button: {
    position: 'relative',
    backgroundColor: '#aaa', // change later
    justifyContent: 'flex-end',
    height: 150,
    // padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  text: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    fontSize: 26,
    color: colors.black,
  },
});
