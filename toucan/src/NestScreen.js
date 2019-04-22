import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native'
import { Icon, Button, Container, Header, Content, Left, Title, Body, Right, Card } from 'native-base';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Col, Grid } from 'react-native-easy-grid';

const { width, height } = Dimensions.get('window');

class NestScreen extends React.Component {
  constructor(props) {
    super(props);

    // const eventID = this.props.navigation.state.params.Selected_Event;
    // console.log(eventID);
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#e8e8e8' }}>
        <Header androidStatusBarColor="#275667" iosBarStyle='light-content' style={styles.header}>
          {/* <Container style={ styles.navButtons }> */}
            <Left style={ styles.navButtons }>
              <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} style={styles.leftIcon} />
            </Left>
            <Body style={ { flex:1, justifyContent:'center', alignItems:'center' } }>
              <Title style={styles.navTitle}>Fintech</Title>
            </Body>
            <Right style={ styles.navButtons }>
              {/* Empty */}
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

class VendorScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#e8e8e8' }}>
        <Header androidStatusBarColor="#275667" iosBarStyle='light-content' style={styles.header}>
          {/* <Container style={ styles.navButtons }> */}
            <Left style={ styles.navButtons }>
              <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} style={styles.leftIcon} />
            </Left>
            <Body style={ { flex:1, justifyContent:'center', alignItems:'center' } }>
              <Title style={styles.navTitle}>Fintech</Title>
            </Body>
            <Right style={ styles.navButtons }>
              {/* Empty */}
            </Right>
          {/* </Container> */}
        </Header>
        
        <Content contentContainerStyle={styles.content}>
          <Grid style={styles.vendorGrid}>
            <Col>
              <Card style={styles.vendorCard}>
                <Text>//</Text>
              </Card>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}

class InfoScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#e8e8e8' }}>
        <Header androidStatusBarColor="#275667" iosBarStyle='light-content' style={styles.header}>
          {/* <Container style={ styles.navButtons }> */}
            <Left style={ styles.navButtons }>
              <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} style={styles.leftIcon} />
            </Left>
            <Body style={ { flex:1, justifyContent:'center', alignItems:'center' } }>
              <Title style={styles.navTitle}>Fintech</Title>
            </Body>
            <Right style={ styles.navButtons }>
              {/* Empty */}
            </Right>
          {/* </Container> */}
        </Header>
        
        <Content contentContainerStyle={styles.content}>
          <Grid style={styles.vendorGrid}>
            <Col>
              <Card style={styles.vendorCard}>
                <Title>Fintech Friday Info</Title>
                <Body><Text>Words</Text></Body>
              </Card>
              <Card style={styles.vendorLoc}>
                <Title>Location</Title>
                <Body><Text>Words</Text></Body>
              </Card>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Chat: NestScreen, 
  Info: InfoScreen,
  Vendors: VendorScreen,
},{
  initialRouteName: 'Chat',
  tabBarOptions: {
    activeTintColor: '#1E7898',
    inactiveTintColor: 'black',
    labelStyle: {
      fontSize: 15, 
      fontFamily: 'Ubuntu-R',
    },
    style: {
      backgroundColor: '#F8F8F8',
    },
  },
});

export default createAppContainer(TabNavigator);

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
    leftIcon: {
        color: 'white',
        left: 10,
    },
    navTitle: {
      color: 'white',
      fontSize: 19,
      fontFamily: 'Ubuntu-B',
    },
    navButtons: {
      flex: 1,
    },
    vendorGrid: {
      paddingTop: 5,
      paddingLeft: 7,
    },
    vendorCard: {
      width: width * 0.95,
      height: height / 3,
      borderRadius: 15,
      paddingTop: 8
    },
    vendorLoc: {
      width: width * 0.95,
      height: height / 9,
      borderRadius: 15,
      paddingTop: 8
    },
});
