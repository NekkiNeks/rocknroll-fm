import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useGlobalContext} from './context';

//Components
import MenuButton from './MenuButton';

export default function Menu() {
  const {state, toggleSearchMenu, searchSong} = useGlobalContext();
  const {showSearchMenu} = state;

  const [menuHeight, setMenuHeight] = useState(0);
  const translation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showSearchMenu) {
      Animated.spring(translation, {
        toValue: -menuHeight,
        useNativeDriver: true,
        duration: 200,
      }).start();
    } else {
      Animated.timing(translation, {
        toValue: 0,
        useNativeDriver: true,
        duration: 200,
      }).start();
    }
  }, [showSearchMenu, menuHeight, translation]);

  function getMenuHeight(e) {
    const {height} = e.nativeEvent.layout;
    setMenuHeight(height);
  }

  return (
    <Animated.View
      style={[
        styles.container,
        [
          {
            transform: [
              {
                translateY: translation,
              },
            ],
            bottom: menuHeight ? -menuHeight : -100,
          },
        ],
      ]}
      onLayout={getMenuHeight}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => toggleSearchMenu(false)}>
        <Icon name={'keyboard-arrow-down'} size={30} color={'#fff'} />
      </TouchableOpacity>
      {/* <Text style={styles.header}>Найти песню :</Text> */}
      <MenuButton text={'Spotify'} onPress={() => searchSong('spotify')} />
      <MenuButton text={'Apple Music'} onPress={() => searchSong('apple')} />
      <MenuButton text={'Яндекс.Музыка'} onPress={() => searchSong('yandex')} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#000',
  },
  closeButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    width: '85%',
    marginLeft: 30,
    paddingBottom: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
});
