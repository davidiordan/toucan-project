import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';
import * as Expo from 'expo';

import firebaseConfig from './src/Firebase/Config';
import Navigator from './src/Navigator/Navigator';

firebaseConfig;

export default class App extends React.Component {
  state = { loading: true };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
      'Ubuntu-B': require('./assets/Fonts/Ubuntu-B.ttf'),
      'Ubuntu-R': require('./assets/Fonts/Ubuntu-R.ttf'),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />
    }
    return (
      <Navigator />
    );
  }
}
