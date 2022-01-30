import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//import components
import {AppProvider} from './components/context';
import Header from './components/Header';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import {Player} from './components/Player';
import List from './components/List';

//code
function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  return (
    <AppProvider>
      <NavigationContainer
        options={{headerTitle: props => <Navbar {...props} />}}>
        <SafeAreaView style={styles.mainContainer}>
          <Header />
          <Tab.Navigator
            tabBar={props => <Navbar {...props} />}
            screenOptions={{headerShown: false}}>
            <Tab.Screen name="Player" component={Player} />
            <Tab.Screen name="List" component={List} />
          </Tab.Navigator>
          <Menu />
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
