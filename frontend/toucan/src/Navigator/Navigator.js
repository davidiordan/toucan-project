import React from 'react';
import { SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';

const { width } = Dimensions.get('window');

import HomeScreen from '../HomeScreen';
import NestScreen from '../NestScreen';
import LoginScreen from "../Login/Login"
import SignUpScreen from "../Login/SignUp";
import AddEventScreen from "../Events/AddEvent";

export default class Navigator extends React.Component {
  render() {
    return (<AppCont />);
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
  Home: HomeScreen,
  Nest: NestScreen,
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

const AuthStack = createStackNavigator({ 
  Login: LoginScreen,
  SignUp: SignUpScreen,
});

const AppCont = createAppContainer(
  createSwitchNavigator({
    App: LeftDrawerNav,
    Auth: AuthStack,
    AddEvent: AddEventScreen,
  },{
    initialRouteName: 'App', // edited here
  })
);