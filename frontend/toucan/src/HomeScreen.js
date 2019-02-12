import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, StatusBar } from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Title, Body, Right } from 'native-base';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <Container style={{ backgroundColor: '#e8e8e8' }}>
        <Header androidStatusBarColor="#275667" iosBarStyle='light-content' style={styles.header}>
          {/* <Container style={ styles.navButtons }> */}
            <Left style={ styles.navButtons }>
              <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} style={styles.leftIcon} />
            </Left>
            <Body style={ { flex:1, justifyContent:'center', alignItems:'center' } }>
              <Title style={styles.navTitle}>Home</Title>
            </Body>
            <Right style={ styles.navButtons }>
              <Icon name="ios-add" style={styles.rightIcon} />
            </Right>
          {/* </Container> */}
        </Header>
        
        <Content contentContainerStyle={styles.content}>
          <Text>Home Screen</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#e8e8e8',
    },
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
      fontSize: 23,
      fontFamily: 'Ubuntu-B',
    },
    navButtons: {
      flex: 1,
    }
  });