import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Icon, Button, Container, Header, Left, Title, Body, Right, Form, Item, Input, Label } from 'native-base';
import * as firebase from 'firebase';
import SelectMultiple from 'react-native-select-multiple';

const { height } = Dimensions.get('window');

const uuidv1 = require('uuid/v1');

const tagsList = [
  { label: 'Sports', value: 'sports' },
  { label: 'Arts and Literature', value: 'arts' },
  { label: 'Conferences', value: 'conferences' },
  { label: 'Education', value: 'education' },
  { label: 'Concerts', value: 'concerts' },
  { label: 'Technology', value: 'tech' },
]

// test location for adding dummy events
const testLoc = {
  latitude: '38.971668',
  longitude: '-95.235252',
}

export default class AddEventScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      name: '',
      location: {
        latitude: '',
        longitude: '',
      },
      tags: [],
      description: '',
    });
  }

  onSelectionsChange = (tags) => {
    this.setState({tags});
  }
  
  addEvent = (name, location, tags, desc) => {
    let eventUID = uuidv1().replace(/-/g, "");
    // testing code
    console.log("\n\n\t UUID: " + eventUID + "\n\n");
    console.log(tags);

    firebase.database().ref('/events/' + eventUID).set({
      creator: firebase.auth().currentUser.email,
      name: name,
      location: location,
      tags: tags,
      description: desc,
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
          <ScrollView>
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
              <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                  <Input autoCapitalize='none' 
                        clearButtonMode='while-editing' 
                        textContentType="location" 
                        placeholder="Event Location" 
                        placeholderTextColor="black" 
                        onChangeText={(location) => this.setState({location})}
                        style={ styles.input } />
              </Item>
              <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                  <Input autoCapitalize='none' 
                        clearButtonMode='while-editing' 
                        textContentType="name" 
                        placeholder="Event Description" 
                        placeholderTextColor="black" 
                        onChangeText={(description) => this.setState({description})}
                        style={ styles.inputDesc } 
                        multiline={true} />
              </Item>
              <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                <Label style={ { color: 'black', fontSize: 18 } }>Tags</Label>
              </Item>
              {/* ADD ANOTHER ITEM HERE FOR THE MULTIPLE SELECT */}
              <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                <SelectMultiple 
                    items={tagsList}
                    selectedItems={this.state.tags}
                    onSelectionsChange={this.onSelectionsChange}
                    style={ styles.input }
                  />
              </Item>            
              <Item style={ { paddingBottom:8, borderColor:'transparent' } }>
                  <Button style={styles.addEvent} onPress={() => this.addEvent(this.state.name, testLoc, this.state.tags, this.state.description)}>
                    <Text style={{color:'white', fontWeight:"bold", fontFamily:"Ubuntu-B", fontSize: 20}}> Add Event </Text>
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
      fontSize: 19,
      fontFamily: 'Ubuntu-B',
    },
    navButtons: {
      flex: 1,
    },
    form: {
      flex: 1,
      top: 8,
      color: 'black',
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
    inputDesc: {
      paddingTop: 8,
      color: '#434343',
      backgroundColor: 'white',
      borderRadius: 15,
      borderWidth: 2,
      borderColor: '#E8E5E5',
      right: 7,
      paddingLeft: 10,
      height: 150
    },
    addEvent: {
      width: 200,
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: "#1E7898",
      borderRadius: 15,
    }
  });