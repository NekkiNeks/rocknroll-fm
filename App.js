import React from 'react';
import {Text} from 'react-native';

//import components
import {AppProvider} from './components/context';
import {Player} from './components/Player';

//code

function App() {
  return (
    <AppProvider>
      <Text>this is RNR App</Text>
      <Player />
    </AppProvider>
  );
}

console.log('everything works!');

// const styles = StyleSheet.create({});

export default App;
