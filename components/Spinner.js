import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
export default function Spinner() {
  const translation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translation, {
        easing: Easing.linear,
        toValue: 359,
        useNativeDriver: false,
        duration: 1000,
      }),
      -1,
    ).start();
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              rotate: translation.interpolate({
                inputRange: [0, 359],
                outputRange: ['0deg', '359deg'],
              }),
            },
          ],
        },
      ]}>
      <Icon name={'circle-o-notch'} size={40} color={'#eee'} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
});
