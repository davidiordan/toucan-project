import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Icon, Button, Container, Header, Left, Title, Body, Right, Form, Item, Input } from 'native-base';
import * as firebase from 'firebase';

const uuidv1 = require('uuid/v1');

export default class AddEventScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      name: '',
    });
  }

  addEvent = (name) => {
    let eventUID = uuidv1().replace(/-/g, "");
    // testing code
    console.log("\n\n\t UUID: " + eventUID + "\n\n");

    firebase.database().ref('/events/' + eventUID).set({
      creator: firebase.auth().currentUser.email,
      name: name,
      // WILL NEED LOCATION AND TAGS
    });

    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#e8e8e8' }}>
        <Header androidStatusBarColor="#275667" iosBarStyle='light-content' style={styles.header}>
            <Left style={ styles.navButtons }>
              <Icon name="ios-arrow-back" onPress={() => this.props.navigation.navigate("Home")} style={styles.leftIcon} />
            </Left>
            <Body style={ { flex:1, justifyContent:'center', alignItems:'center' } }>
              <Title style={styles.navTitle}>Add Event</Title>
            </Body>
            <Right style={ styles.navButtons }>
              {/* Empty */}
            </Right>
        </Header>
        <KeyboardAvoidingView behavior="padding" style={styles.content}>
          <Form style={ styles.form }>
            <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                <Input autoCapitalize='none' 
                      clearButtonMode='while-editing' 
                      textContentType="name" 
                      placeholder="Event Name" 
                      placeholderTextColor="black" 
                      onChangeText={(name) => this.setState({name})}
                      style={ styles.input } />
            </Item>
            {/* ADD MORE ITEMS HERE FOR THE TAGS AND LOCATION */}
            <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                <Button style={styles.addEvent} onPress={() => this.addEvent(this.state.name)}>
                  <Text style={{color:'white', fontWeight:"bold", fontFamily:"Ubuntu-B", fontSize: 20}}> Add Event </Text>
                </Button>
            </Item>
          </Form>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      backgroundColor: '#E8E8E8',
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
    },
    form: {
      top: 8,
      color: 'black',
      justifyContent: "center", 
      alignItems: "center",
    },
    input: {
      color: '#434343',
      backgroundColor: 'white',
      borderRadius: 15,
      borderWidth: 2,
      borderColor: '#E8E5E5',
      right: 7,
      paddingLeft: 10
    },
    addEvent: {
      width: 200,
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: "#1E7898",
      borderRadius: 15,
    }
  });