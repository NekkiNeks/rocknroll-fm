import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useGlobalContext} from './context';

//Components
import MenuButton from './MenuButton';

export default function Menu() {
  const {state, toggleMenu} = useGlobalContext();
  const {showMenu} = state;

  const [menuHeight, setMenuHeight] = useState(0);
  const translation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showMenu) {
      Animated.timing(translation, {
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
  }, [showMenu, menuHeight, translation]);

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
            translateY: translation,
            bottom: menuHeight ? -menuHeight : -100,
          },
        ],
      ]}
      onLayout={getMenuHeight}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => toggleMenu(false)}>
        <Icon name={'keyboard-arrow-down'} size={30} color={'#fff'} />
      </TouchableOpacity>
      <MenuButton text={'Настройки'} />
      <MenuButton text={'Подкасты'} />
      <MenuButton text={'Позвонить в эфир'} />
      <MenuButton text={'Поддержать радиостанцию'} />
      <MenuButton text={'Перейти на сайт'} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  closeButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
});
