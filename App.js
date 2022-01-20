import React from 'react';
import {View, Text} from 'react-native';

//import components
import {AppProvider} from './components/context';
import {Player} from './components/Player';

//code

function App() {
  return (
    <AppProvider>
      <View style={{backgroundColor: '#eee'}}>
        <Text>Header will be here</Text>
        <Player />
        <Text>Buttons will be here</Text>
      </View>
    </AppProvider>
  );
}

console.log('everything works!');

// const styles = StyleSheet.create({});

export default App;
