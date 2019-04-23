import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Text, View, Dimensions, Alert, ActivityIndicator } from 'react-native'
import { Icon, Button, Container, Header, Content, Left, Title, Body, Right, Card } from 'native-base';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Col, Grid } from 'react-native-easy-grid';
import { Bubble, GiftedChat, MessageText } from 'react-native-gifted-chat';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

class NestScreen extends React.Component {
  // constructor(props) {
  //   super(props);

  //   const eventID = this.props.navigation.state.params.Selected_Event;
  //   console.log(eventID);
  // }

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      userId: 'no_user_logged_in',
      loading: true,
    };

    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        let userId = JSON.parse(request.responseText);
        this.state.userId = userId;
      } else {
        console.warn('error getting username');
      }

      this.setState({ loading: false });
    };

    request.open('GET', 'https://toucan-v1-6245e.firebaseio.com/users/' + firebase.auth().currentUser.uid + "/username.json");
    request.send();
  }

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#F8F8F8',
          },
          right: {
            backgroundColor: '#1E7898'
          }
        }}
        renderUsernameOnMessage={true}
      />
    );
  };

  renderMessageText = (props) => {
    return (
      <MessageText
        {...props}
        textStyle={{
          left: [
            styles.msgTxt
          ],
          right: [
            styles.msgTxt
          ]
        }}
      />
    );
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  on = (callback) => {
    this.ref.limitToLast(45).on('child_added', snapshot => {
      callback(this.parse(snapshot))
    });
  }

  parse = (snapshot) => {
    const {timestamp: numberStamp, text, user} = snapshot.val();
    const {key: _id} = snapshot;

    const timestamp = new Date(numberStamp);

    const message = {
      _id, 
      timestamp, 
      text, 
      user
    };

    return message;
  }

  off() {
    this.ref.off();
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  send = (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];

      const message = {
        text, 
        user, 
        timestamp: this.timestamp,
      }

      this.append(message);
    }
  }

  append = (message) => {
    this.ref.push(message);
  }

  get user() {
    return {
      name: this.state.userId,
      _id: firebase.auth().currentUser.uid,
    }
  }

  get ref(){
    return firebase.database().ref('messages');
  }

  render() {
    if (this.state.loading) {
      return (
        <Container style={{ backgroundColor: '#e8e8e8' }}>
          <Header androidStatusBarColor="#275667" iosBarStyle='light-content' style={styles.header}>
              <Left style={ styles.navButtons }>
              <Icon name="ios-home" onPress={() => this.props.navigation.navigate("Home")} style={styles.leftIcon} />
              </Left>
              <Body style={ { flex:1, justifyContent:'center', alignItems:'center' } }>
                <Title style={styles.navTitle}>Loading</Title>
              </Body>
              <Right style={ styles.navButtons }>
                <Icon name="ios-add" onPress={() => this.props.navigation.navigate("AddEvent")} style={styles.rightIcon} />
              </Right>
          </Header>
          <ActivityIndicator
            style={{ paddingTop: height/2.6, }}
            size="large" color="#1E7898"
          />
        </Container>
      )
    } 
    return (
      <Container style={{ backgroundColor: '#e8e8e8' }}>
        <Header androidStatusBarColor="#275667" iosBarStyle='light-content' style={styles.header}>
          {/* <Container style={ styles.navButtons }> */}
            <Left style={ styles.navButtons }>
            <Icon name="ios-home" onPress={() => this.props.navigation.navigate("Home")} style={styles.leftIcon} />
            </Left>
            <Body style={ { flex:1, justifyContent:'center', alignItems:'center' } }>
              <Title style={styles.navTitle}>Chat</Title>
            </Body>
            <Right style={ styles.navButtons }>
              {/* Empty */}
            </Right>
          {/* </Container> */}
        </Header>
        
        <GiftedChat
          messages={this.state.messages}
          onSend={this.send}
          user={this.user}
          renderBubble={this.renderBubble}
          renderMessageText={this.renderMessageText}
          placeholder="Words go here!"
          bottomOffset={82}
        />
      </Container>
    );
  }

  componentDidMount() {
    this.on(message => {
      this.setState(prevState => ({
        messages: GiftedChat.append(prevState.messages, message)
      }))
    });
  }

  componentWillUnmount() {
    this.off();
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
              <Icon name="ios-home" onPress={() => this.props.navigation.navigate("Home")} style={styles.leftIcon} />
            </Left>
            <Body style={ { flex:1, justifyContent:'center', alignItems:'center' } }>
              <Title style={styles.navTitle}>Vendors</Title>
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
                <Title style={{fontFamily: "Ubuntu-B"}}>No Vendors Have Been Provided</Title>
                <Body>
                  <Text style={{fontFamily: "Ubuntu-R", fontSize: 16, paddingTop: 10}}>
                    The creator of this event has yet to enter and information regarding vendors.
                  </Text>
                </Body>
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
            <Icon name="ios-home" onPress={() => this.props.navigation.navigate("Home")} style={styles.leftIcon} />
            </Left>
            <Body style={ { flex:1, justifyContent:'center', alignItems:'center' } }>
              <Title style={styles.navTitle}>Info</Title>
            </Body>
            <Right style={ styles.navButtons }>
              {/* Empty */}
            </Right>
          {/* </Container> */}
        </Header>
        
        <Content contentContainerStyle={styles.content}>
          <Grid style={styles.vendorGrid}>
            <Col>
              <Card style={styles.infoCard}>
                <Title style={{fontFamily: "Ubuntu-B"}}>EECS 582 Demo Info</Title>
                <Body>
                  <Text style={{fontFamily: "Ubuntu-R", fontSize: 16, paddingTop: 10}}>
                    We are gathered to day to celebrate the "completion" of Toucan. Toucan was the
                    Senior Design project for Team 14. Let's all come together and enjoy what they
                    did.
                  </Text>
                </Body>
              </Card>
              <Card style={styles.vendorLoc}>
                <Title style={{fontFamily: "Ubuntu-B"}}>Location</Title>
                <Body>
                  <Text style={{fontFamily: "Ubuntu-R", fontSize: 16, paddingTop: 10}}>
                    One Apple Park Way, Cupertino, CA 95014
                  </Text>
                </Body>
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
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = MaterialIcons;
      let iconName;
      if (routeName === 'Chat') {
        iconName = `chat-bubble`;
      } else if (routeName === 'Info') {
        iconName = `info`;
      } else if (routeName === 'Vendors') {
        iconName = `attach-money`;
      }
      
      return <IconComponent name={iconName} size={20} color={tintColor} />;
    },
  }),
  initialRouteName: 'Chat',
  tabBarOptions: {
    activeTintColor: '#1E7898',
    inactiveTintColor: '#333333',
    labelStyle: {
      fontSize: 16, 
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
      height: height / 9,
      borderRadius: 15,
      paddingTop: 8
    },
    infoCard: {
      width: width * 0.95,
      height: height / 6,
      borderRadius: 15,
      paddingTop: 8
    },
    vendorLoc: {
      width: width * 0.95,
      height: height / 9,
      borderRadius: 15,
      paddingTop: 10
    },
    msgTxt: {
      fontFamily: 'Ubuntu-R',
      fontSize: 16,
    }
});
