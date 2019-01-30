import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Title, Body, Right } from 'native-base';

export default class NestScreen extends React.Component {
  render() {
    return (
      <Container style={{ backgroundColor: '#e8e8e8' }}>
        <Header androidStatusBarColor="#275667" iosBarStyle='light-content' style={styles.header}>
          {/* <Container style={ styles.navButtons }> */}
            <Left style={ styles.navButtons }>
              <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} style={styles.icon} />
            </Left>
            <Body style={ { flex:1, justifyContent:'center', alignItems:'center' } }>
              <Title style={styles.navTitle}>Nest</Title>
            </Body>
            <Right style={ styles.navButtons }>
              {/* empty */}
            </Right>
          {/* </Container> */}
        </Header>
        
        <Content contentContainerStyle={styles.content}>
          <Text>Nest Screen</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#e8e8e8',
    },
    header: {
      backgroundColor: '#1E7898',
    },
    icon: {
        color: 'white',
        left: 10,
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