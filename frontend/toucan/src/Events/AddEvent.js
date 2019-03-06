import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Icon, Button, Container, Header, Left, Title, Body, Right, Form, Item, Input } from 'native-base';

const { width } = Dimensions.get('window');

export default class AddEventScreen extends React.Component {
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
                      onChangeText={(email) => this.setState({email})}
                      style={ styles.input } />
            </Item>
            <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                <Button style={styles.addEvent} onPress={() => Alert.alert("Add Event Button Tapped")}>
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
    cards: {
      width: width / 2.2,
      aspectRatio: 3/4,
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