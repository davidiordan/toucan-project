import React from 'react';
import * as firebase from 'firebase';
// 1.
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Title, Body, Right, Card } from 'native-base';



/*type Props = {
  name?: string,
};*/

export default class Chat extends React.Component {
  // 2.
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });
  // 3.
  state = {
    messages: [],
  }
  
  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          },
        }}
      />
    );
  };

  get username() {
    var fb = (firebase.database().ref("/users/" + currentUser.uid).on("username", function(snapshot) {
      console.log(snapshot.val());
    })
    );
    return {
      name: "hi"
    };
  }

  get user() {
    //this.username();
    var rug = require('random-username-generator');
    var username = rug.generate();
    return {
      name: username,
      _id: (firebase.auth().currentUser || {}).uid,
    }
  }

  get ref(){
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback => 
    this.ref  
      . limitToLast(40).on('child_added', snapshot => callback(this.parse(snapshot)));
      get timestamp(){
        return firebase.database.ServerValue.TIMESTAMP;
      }
  
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };
    
  append = message => this.ref.push(message);

  off() {
    this.ref.off();
  }

  render() {
    // 4.
    var user = firebase.auth().currentUser;
    if(user) {
      //Alert.alert("User is signed in " + user);
    }
    else {
      Alert.alert("Didn't work");
    }
    return (
      <Container style={{ backgroundColor: '#e8e8e8' }}>
        <Header androidStatusBarColor="#275667" iosBarStyle='light-content' style={styles.header}>
          {/* <Container style={ styles.navButtons }> */}
            <Left style={ styles.navButtons }>
              <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} style={styles.leftIcon} />
            </Left>
            <Body style={ { flex:1, justifyContent:'center', alignItems:'center' } }>
              <Title style={styles.navTitle}>Chat Screen</Title>
            </Body>
            <Right style={ styles.navButtons }>
              {/* Empty */}
            </Right>
          {/* </Container> */}
        </Header>
        <GiftedChat
          messages={this.state.messages}
          onSend = {this.send}
          user={this.user}
          renderBubble = {this.renderBubble}
        />
      </Container>
    );
  }

  componentDidMount() {
    this.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    this.off();
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
  }
});
