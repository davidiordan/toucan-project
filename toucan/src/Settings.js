import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions} from 'react-native';
import { Container, Header, Left, Right, Body, Icon, Title } from 'native-base';
import * as firebase from 'firebase';

const {width, height} = Dimensions.get("window");

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      logout: false,
    });
  }

  //signOutUser

  render() {
    return (
      <Container style={{ backgroundColor: '#e8e8e8' }}>
          <Header androidStatusBarColor="#275667" iosBarStyle='light-content' style={styles.header}>
              <Left style={ styles.navButtons }>
                <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} style={styles.leftIcon} />
              </Left>
              <Body style={ { flex:1, justifyContent:'center', alignItems:'center' } }>
                <Title style={styles.navTitle}>Settings</Title>
              </Body>
              <Right style={ styles.navButtons }>
                {/* nothing */}
              </Right>
          </Header>
          <ActivityIndicator
            style={{ paddingTop: height/2.6, }}
            size="large" color="#1E7898"
          />
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1E7898',
  },
  leftIcon: {
    color: 'white',
    left: 10,
  },
  rightIcon: {
    color: 'white',
    right: 10,

  },
  navTitle: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'Ubuntu-B',
  },
  navButtons: {
    flex: 1,
  },
  });