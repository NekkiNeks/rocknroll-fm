import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useGlobalContext} from './context';
import {strings} from '../localization/localization';
import {colors} from './theme';

//Components
import MenuButton from './MenuButton';

export default function Menu() {
  const {state, toggleMenu, openUrl, openPhone} = useGlobalContext();
  const {showMenu} = state;

  const [menuHeight, setMenuHeight] = useState(0);
  const Translation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showMenu) {
      Animated.spring(Translation, {
        toValue: -menuHeight,
        useNativeDriver: true,
        duration: 200,
      }).start();
    } else {
      Animated.timing(Translation, {
        toValue: 0,
        useNativeDriver: true,
        duration: 200,
      }).start();
    }
  }, [showMenu, menuHeight, Translation]);

  function getMenuHeight(e) {
    const {height} = e.nativeEvent.layout;
    setMenuHeight(height);
  }

  return (
    <View>
      {showMenu && (
        <TouchableOpacity
          style={styles.closeView}
          onPress={() => toggleMenu(false)}
        />
      )}
      <Animated.View
        style={[
          styles.container,
          [
            {
              transform: [
                {
                  translateY: Translation,
                },
              ],
              bottom: menuHeight ? -menuHeight : -100,
            },
          ],
        ]}
        onLayout={getMenuHeight}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => toggleMenu(false)}>
          <Icon name={'keyboard-arrow-down'} size={30} color={colors.white} />
        </TouchableOpacity>
        <MenuButton
          text={strings.menu.call}
          onPress={() => {
            openPhone();
            toggleMenu(false);
          }}
        />
        <MenuButton
          text={strings.menu.donate}
          onPress={() => {
            openUrl('https://rnr.fm/donate');
            toggleMenu(false);
          }}
        />
        <MenuButton
          text={strings.menu.website}
          onPress={() => {
            openUrl('https://rnr.fm');
            toggleMenu(false);
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
    flex: 1,
    left: 0,
    right: 0,
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
