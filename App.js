import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';

//import components
import {AppProvider} from './components/context';
import {Player} from './components/Player';

//code

function App() {
  return (
    <AppProvider>
      <View style={styles.mainContainer}>
        <Text>Header will be here</Text>
        <Player />
        <Text>Buttons will be here</Text>
      </View>
    </AppProvider>
  );
}

console.log('everything works!');

const fullHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#eee',
    height: fullHeight,
  },
});

export default App;
