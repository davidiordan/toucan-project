import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';
import * as Expo from 'expo';

import firebaseConfig from './src/Firebase/Config';

import HomeScreen from './src/HomeScreen';
import NestScreen from './src/NestScreen';
import LoginScreen from "./src/Login/Login"

const { width } = Dimensions.get('window');

firebaseConfig;

export default class App extends React.Component {
  state = { loading: true };

  async componentWillMount() {
    await Expo.Font.loadAsync({
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
      <AppCont />
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
  Logout: {
    screen: LoginScreen
  },
}, {
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'white',
    activeBackgroundColor: '#3A4240',
    labelStyle: { fontSize: 17, fontFamily: 'Ubuntu-B' },
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
const AuthStack = createStackNavigator({ Login: LoginScreen });

const AppCont = createAppContainer(createSwitchNavigator(
  {
    App: LeftDrawerNav,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
));

