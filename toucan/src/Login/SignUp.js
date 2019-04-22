import React from 'react';
import { StyleSheet, Text, StatusBar, Dimensions, KeyboardAvoidingView, Alert, ScrollView } from 'react-native';
import { Container, Form, Item, Input, Button, Label } from 'native-base';
import * as firebase from 'firebase';
import SelectMultiple from 'react-native-select-multiple';

const { height } = Dimensions.get('window');

const tagsList = [
  { label: 'Sports', value: 'sports' },
  { label: 'Arts and Literature', value: 'arts' },
  { label: 'Conferences', value: 'conferences' },
  { label: 'Education', value: 'education' },
  { label: 'Concerts', value: 'concerts' },
  { label: 'Technology', value: 'tech' },
]

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      email: '',
      password1: '',
      password2: '',
      tags: [],
    });
  }

  onSelectionsChange = (tags) => {
    this.setState({tags});
  }

  writeUserData = (userId, email, tags, username) => {
    console.log("\n\n\tTEST: " + userId + " " + email + "\n\n");

    firebase.database().ref('/users/' + userId).set({
      email: email,
      tags: tags,
      username: username,
    });
  }

  signUpUser = (email, password1, password2, tags) => {
    if (this.state.password1.length < 8) {
      Alert.alert("Password must be at least 8 characters long.");
      return;
    }
    else if  (this.state.password1 !== this.state.password2) {
      Alert.alert("Passwords do not match.");
      return;
    }

    var rug = require('random-username-generator');
    var username = rug.generate();

    firebase.auth().createUserWithEmailAndPassword(email, password1).then(() => {
      let curUser = firebase.auth().currentUser;
      this.writeUserData(curUser.uid, curUser.email, tags, username);
      // below line is just a test
      // firebase.auth().currentUser.sendEmailVerification();

      this.props.navigation.navigate('Login');
    }).catch(error => {Alert.alert(error.message)});
  }

  static navigationOptions = {
    title: 'Sign Up',
    headerStyle: {
      backgroundColor: '#1E7898',
    },
    headerTitleStyle: {
      fontFamily: 'Ubuntu-B',
      fontWeight: 'bold',
      color: '#ffffff',
      fontSize: 19,
    },
    headerTintColor: "#ffffff",
  };

  render() {
    return (
    <Container style={ { backgroundColor: '#E8E8E8' } }>
        <StatusBar backgroundColor="#E8E8E8" barStyle="light-content" />
        <KeyboardAvoidingView behavior="padding" style={styles.content}>
          <ScrollView>
              <Form style={ styles.form }>
                  <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                      <Input autoCapitalize='none' 
                            clearButtonMode='while-editing' 
                            textContentType="emailAddress" 
                            placeholder="email address" 
                            placeholderTextColor="black" 
                            onChangeText={(email) => this.setState({email})}
                            style={ styles.input } />
                  </Item>
                  <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                      <Input secureTextEntry={true} 
                            clearButtonMode='while-editing' 
                            textContentType="password" 
                            placeholder="password" 
                            placeholderTextColor="black" 
                            onChangeText={(password1) => this.setState({password1})}
                            style={ styles.input } />
                  </Item>
                  <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                      <Input secureTextEntry={true} 
                            clearButtonMode='while-editing' 
                            textContentType="password" 
                            placeholder="re-enter password" 
                            placeholderTextColor="black" 
                            onChangeText={(password2) => this.setState({password2})}
                            style={ styles.input } />
                  </Item>
                  {/* ADD ANOTHER ITEM HERE FOR THE MULTIPLE SELECT */}
                  <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                    <Label style={ { color: 'black', fontSize: 18 } }>Tags</Label>
                  </Item>
                  <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                    <SelectMultiple 
                        items={tagsList}
                        selectedItems={this.state.tags}
                        onSelectionsChange={this.onSelectionsChange}
                        style={ styles.input }
                      />
                  </Item>
                  <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                      <Button 
                        style={styles.signIn} 
                        onPress={() => this.signUpUser(
                                        this.state.email, 
                                        this.state.password1, 
                                        this.state.password2, 
                                        this.state.tags)}>
                        <Text 
                          style={{color:'white', fontWeight:"bold", fontFamily:"Ubuntu-B", fontSize: 20}}> 
                          Sign Up 
                        </Text>
                      </Button>
                  </Item>
              </Form>
            </ScrollView>
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
    signInTitle: {
      paddingBottom: 8,
      color: 'black',
      fontSize: 23,
      fontFamily: 'Ubuntu-B'
    },
    form: {
      top: 8,
      color: 'black',
      alignItems: "center",
      height: (4.01*height)/5,
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
    signIn: {
      width: 200,
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: "#1E7898",
      borderRadius: 15,
    }
  });