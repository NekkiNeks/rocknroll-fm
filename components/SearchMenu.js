import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useGlobalContext} from './context';
import {colors} from './theme';

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
    <View>
      {showSearchMenu && (
        <TouchableOpacity
          style={styles.closeView}
          onPress={() => toggleSearchMenu(false)}
        />
      )}
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
          <Icon name={'keyboard-arrow-down'} size={30} color={colors.white} />
        </TouchableOpacity>
        <MenuButton
          text={'Spotify'}
          onPress={() => {
            searchSong('spotify');
            toggleSearchMenu(false);
          }}
        />
        <MenuButton
          text={'Apple Music'}
          onPress={() => {
            searchSong('apple');
            toggleSearchMenu(false);
          }}
        />
        <MenuButton
          text={'Yandex'}
          onPress={() => {
            searchSong('yandex');
            toggleSearchMenu(false);
          }}
        />
      </Animated.View>
    </View>
  );
}

//Get height of phone
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: colors.menubg,
    paddingBottom: 40,
  },
  closeView: {
    position: 'absolute',
    height: screenHeight,
    top: -screenHeight,
    width: '100%',
  },
  closeButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});
