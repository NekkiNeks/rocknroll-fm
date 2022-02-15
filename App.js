import React from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//import components
import {AppProvider} from './components/context';
import Header from './components/Header';
import Menu from './components/Menu';
import SearchMenu from './components/SearchMenu';
import Navbar from './components/Navbar';
import Player from './components/Player';
import List from './components/List';
import PodcastsMenu from './components/PodcastsRouter';

//code
function App() {
  const Tab = createBottomTabNavigator();

  return (
    <AppProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <SafeAreaView style={styles.mainContainer}>
          <Header />
          <Tab.Navigator
            tabBar={props => <Navbar {...props} />}
            screenOptions={{headerShown: false}}>
            <Tab.Screen name="Player" component={Player} />
            <Tab.Screen name="PodcastsMenu" component={PodcastsMenu} />
            <Tab.Screen name="List" component={List} />
          </Tab.Navigator>
          <Menu />
          <SearchMenu />
        </SafeAreaView>
      </NavigationContainer>
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
