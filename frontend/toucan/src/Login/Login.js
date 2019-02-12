import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, StatusBar, Image, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Form, Item, Input, Button } from 'native-base';
import { LinearGradient } from 'expo';

export default class LoginScreen extends React.Component {
  render() {
    return (
    <Container style={ { backgroundColor: '#E8E8E8' } }>
        <StatusBar backgroundColor="#E8E8E8" barStyle="dark-content" />
        <KeyboardAvoidingView behavior="padding" style={styles.content}>
            <View style={ styles.imgContent }>
                <Image source={require('../../assets/V2.png')} style={{width:200, height:147}}/>
            </View>
            <Form style={ styles.form }>
                <Text style={ styles.text }>Sign In</Text>
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
                    <Button style={styles.signIn}><Text style={{color:'white', fontWeight:"bold", fontFamily:"Ubuntu-B", fontSize: 20}}> Sign In </Text></Button>
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
    navTitle: {
      color: 'white',
      fontSize: 23,
      fontFamily: 'Ubuntu-B',
    },
    imgContent: {
        flex: .65,
        backgroundColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    text: {
        paddingLeft: 10,
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