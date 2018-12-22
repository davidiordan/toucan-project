import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Title, Body, Right } from 'native-base';

// Below is some horribly ugly code that allows the header to render
//    properly on the new iPhones. This was apparently fixed with 
//    NativeBase version 2.9.2, but Expo and React Native don't
//    play well together and using the latest version creates headaches...

const { height } = Dimensions.get('window');

topSpace = 0;
headerSize = 64;

if (height === 812) {
  headerSize = 90;
  topSpace = 0;
} else if (height === 896) {
  topSpace = 10;
  headerSize = 90;
} else if (height === 276) {
  topSpace = 5;
  headerSize = 90;
} else {
  topSpace = 0;
  headerSize = 64;
}

export default class NestScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header iosBarStyle='light-content' style={styles.header}>
          {/* <Container style={ styles.navButtons }> */}
            <Left style={ styles.navButtons }>
              <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} style={styles.icon} />
            </Left>
            <Body style={ styles.navButtons }>
              <Title style={styles.navTitle}>Chat</Title>
            </Body>
            <Right style={ styles.navButtons }>
              {/* empty */}
            </Right>
          {/* </Container> */}
        </Header>
        
        <Content contentContainerStyle={styles.content}>
          <Text>Chat Screen</Text>
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
      height: headerSize,
    },
    icon: {
        color: 'white',
        left: 10,
    },
    navTitle: {
      color: 'white',
      fontSize: 21,
      fontFamily: 'Ubuntu-B',
    },
    navButtons: {
      flex: 1,
      top: topSpace,
    }
  });