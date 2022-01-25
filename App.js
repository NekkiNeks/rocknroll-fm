import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';

//import components
import {AppProvider} from './components/context';
import Header from './components/Header';
import {Player} from './components/Player';

//code

function App() {
  return (
    <AppProvider>
      <View style={styles.mainContainer}>
        {/* <Text>Header will be here</Text> */}
        <Header />
        <Player />
        <Text>Buttons will be here</Text>
      </View>
    </AppProvider>
  );
}

console.log('everything works!');

const fullHeight = Dimensions.get('window').height - 25;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#eee',
    height: fullHeight,
    // justifyContent: 'space-between',
    // flexGrow: 1,
  },
});

export default App;
