import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, KeyboardAvoidingView, Alert } from 'react-native';
import { Container, Content, Form, Item, Input, Button } from 'native-base';

export default class LoginScreen extends React.Component {
  _alert() {
    Alert.alert("Testing Purposes Only.")
  }
  
  render() {
    return (
    <Container style={ { backgroundColor: '#E8E8E8' } }>
        <StatusBar backgroundColor="#E8E8E8" barStyle="dark-content" />
        <KeyboardAvoidingView behavior="padding" style={styles.content}>
            <View style={ styles.imgContent }>
                <Image source={require('../../assets/V2.png')} style={{width:200, height:147}}/>
            </View>
            <Form style={ styles.form }>
                <Text style={ styles.signInTitle }>Sign In</Text>
                <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                    <Input autoCapitalize='none' clearButtonMode='while-editing' textContentType="username" placeholder="email address" placeholderTextColor="black" style={ styles.input } />
                </Item>
                <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                    <Input secureTextEntry={true} clearButtonMode='while-editing' textContentType="password" placeholder="password" placeholderTextColor="black" style={ styles.input } />
                </Item>
                <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                    <Text>Don't have an account? </Text>
                    <Button transparent info><Text style={{color:'#55B1C5'}}>Sign Up</Text></Button>
                </Item>
                <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                    <Button style={styles.signIn} onPress={this._alert}><Text style={{color:'white', fontWeight:"bold", fontFamily:"Ubuntu-B", fontSize: 20}}> Sign In </Text></Button>
                </Item>
            </Form>
        </KeyboardAvoidingView>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
    content: {
      flex: .95,
      backgroundColor: '#E8E8E8',
    },
    imgContent: {
        flex: .65,
        backgroundColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
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
        paddingTop: 50,
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