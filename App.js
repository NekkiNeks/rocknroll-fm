import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

//import components
import {AppProvider} from './components/context';
import Header from './components/Header';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import {Player} from './components/Player';

//code
function App() {
  return (
    <AppProvider>
      <SafeAreaView style={styles.mainContainer}>
        <Header />
        <Player />
        <Navbar />
        <Menu />
      </SafeAreaView>
    </AppProvider>
  );
}

console.log('everything works!');

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#000',
    height: '100%',
  },
});

export default App;
