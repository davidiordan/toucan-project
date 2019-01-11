import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import { Font } from 'expo';

import HomeScreen from './HomeScreen';
import NestScreen from './NestScreen';

const { width } = Dimensions.get('window');

export default class App extends React.Component {
  state = { loading: true };

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
      'Ubuntu-B': require('./assets/Fonts/Ubuntu-B.ttf'),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />
    }
    return (
      <LeftDrawerNav  />
    );
  }
}

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{flex: 1}}>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const LeftDrawerNav = createDrawerNavigator ({
  Home: {
    screen: HomeScreen
  },
  Nest: {
    screen: NestScreen
  },
}, {
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'white',
    activeBackgroundColor: '#3A4240',
  },
  drawerBackgroundColor: '#222A28',
  drawerWidth: width * 0.6,
  drawerPosition: 'left',
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e2e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});