
import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, KeyboardAvoidingView, Alert } from 'react-native';
import { Container, Content, Form, Item, Input, Button } from 'native-base';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      email: '',
      password1: '',
      password2: ''
    });
  }

  signUpUser = (email, password1, password2) => {
    if (this.state.password1.length < 8) {
      Alert.alert("Password must be at least 8 characters long.");
      return;
    }
    else if  (this.state.password1 !== this.state.password2) {
      Alert.alert("Passwords do not match.");
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password1).then(() => {
      this.props.navigation.navigate('Login');
    }).catch(error => {Alert.alert("Unable to create account. Try again later.")});
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
      fontSize: 23,
    },
    headerTintColor: "#ffffff",
  };

  render() {
    return (
    <Container style={ { backgroundColor: '#E8E8E8' } }>
        <StatusBar backgroundColor="#E8E8E8" barStyle="light-content" />
        <KeyboardAvoidingView behavior="padding" style={styles.content}>
            <Form style={ styles.form }>
                <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                    <Input autoCapitalize='none' 
                           clearButtonMode='while-editing' 
                           textContentType="username" 
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
                <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                    <Button style={styles.signIn} onPress={() => this.signUpUser(this.state.email, this.state.password1, this.state.password2)}><Text style={{color:'white', fontWeight:"bold", fontFamily:"Ubuntu-B", fontSize: 20}}> Sign Up </Text></Button>
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
    signInTitle: {
      paddingBottom: 8,
      color: 'black',
      fontSize: 23,
      fontFamily: 'Ubuntu-B'
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
    signIn: {
      width: 200,
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: "#1E7898",
      borderRadius: 15,
    }
  });