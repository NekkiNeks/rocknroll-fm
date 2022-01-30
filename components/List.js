import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
export default function List() {
  useEffect(() => console.log('fetch'), []);
  return (
    <View style={styles.container}>
      <Text>This is list of songs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
});
