import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, KeyboardAvoidingView, Alert, AsyncStorage } from 'react-native';
import { Container, Form, Item, Input, Button } from 'native-base';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      email: '',
      password: ''
    });
  }

  signInUser = async (email, password) => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        this.props.navigation.navigate('App');
      }).catch(error => {Alert.alert(error.message)})
    )
  }

  static navigationOptions = {
    title: 'Sign In',
    headerStyle: {
      backgroundColor: '#1E7898',
    },
    headerTitleStyle: {
      fontFamily: 'Ubuntu-B',
      fontWeight: 'bold',
      color: '#ffffff',
      fontSize: 23
    },
    headerTintColor: "#ffffff",
  };

  render() {
    return (
    <Container style={ { backgroundColor: '#E8E8E8' } }>
        <StatusBar backgroundColor="#1E7898" barStyle="light-content" />
        <KeyboardAvoidingView behavior="padding" style={styles.content}>
            <View style={ styles.imgContent }>
                <Image source={require('../../assets/V2.png')} style={{width:186, height:136}}/>
            </View>
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
                <Item style={ { borderColor:'transparent' } }>
                    <Input secureTextEntry={true} 
                           clearButtonMode='while-editing' 
                           textContentType="password" 
                           placeholder="password" 
                           placeholderTextColor="black" 
                           onChangeText={(password) => this.setState({password})}
                           style={ styles.input } />
                </Item>
                <Item style={ { borderColor:'transparent' } }>
                    <Text style={{fontFamily:'Ubuntu-R', fontSize:15}}>Don't have an account? </Text>
                    <Button transparent info onPress={() => this.props.navigation.navigate('SignUp')}><Text style={{color:'#55B1C5', fontFamily:'Ubuntu-B', fontSize:15}}>Sign Up</Text></Button>
                </Item>
                <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                    <Button style={styles.signIn} onPress={() => this.signInUser(this.state.email, this.state.password)}><Text style={{color:'white', fontWeight:"bold", fontFamily:"Ubuntu-B", fontSize: 20}}> Sign In </Text></Button>
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
    imgContent: {
        flex: .6,
        backgroundColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInTitle: {
        paddingBottom: 8,
        color: 'black',
        fontSize: 23,
        fontFamily: 'Ubuntu-B'
    },
    form: {
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