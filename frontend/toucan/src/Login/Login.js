import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, StatusBar, Image, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Form, Item, Input, Button } from 'native-base';

export default class LoginScreen extends React.Component {
  render() {
    return (
    <Container style={ { backgroundColor: '#1E7898' } }>
        
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
            </Form>
            <View>
                <Text>Don't have an account?</Text>
                <Button transparent info><Text style={{color:'#55B1C5'}}>Sign Up</Text></Button>
            </View>
            <Button primary><Text style={{color:'white'}}> Sign In </Text></Button>
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
        flex: .75,
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
        paddingTop: 15
    },
    input: {
        color: '#434343',
        backgroundColor: 'white',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderWidth: 2,
        borderColor: '#E8E5E5'
    }
  });