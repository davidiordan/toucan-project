import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Title, Body, Right, Card } from 'native-base';
import { Constants, Location, Permissions } from 'expo';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';

const { width, height } = Dimensions.get('window');

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      loading: true,
      user: '',
      email: '',
      events: [],
      location: null,
      errorMessage: null,
    });

    let curUser = firebase.auth().currentUser;
    if (curUser !== null) {
      this.state.user = curUser;
      this.state.email = this.state.user.email;
    }

    // using a GET request to pull events from database..
    //    kind of iffy and might be resource intensive
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        // setting this.state.events to the values from the databse
        let events = request.responseText;

        try {
          let eventsJSON = JSON.parse(events);
          let result = [];
          for (var event in eventsJSON) {
            result.push([event, eventsJSON[event]]);
          }

          for (var i in result) {
            let finEvent = {};
            let singEvent = result[i][1];

            finEvent.uid = result[i][0];
            finEvent.name = singEvent.name;
            finEvent.creator = singEvent.creator;
            finEvent.location = singEvent.location;
            finEvent.tags = singEvent.tags;

            this.state.events.push(finEvent);
          }

          // for (var m in this.state.events) {
          //   console.log(this.state.events[m]);
          // }

          console.log(this.state.events);

          // this.state.events = result;

        } catch (err) {
          console.warn(err);
        }
      } else {
        console.warn('error');
      }

      this.setState({ loading: false });
    };

    _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({errorMessage: 'Permission to access location was denied'});

        let topLoc = {
          "latitude": 39.0473,
          "longitude": -95.6751,
        }
        
        this.setState({location: topLoc})
      } else {
        let location = await Location.getCurrentPositionAsync({});

        let locObj = {
          "latitude": location.coords.latitude,
          "longitude": location.coords.longitude,
        }
        this.setState({ location: locObj });
      }
      
      request.open('GET', 'https://toucan-v1-6245e.firebaseio.com/events.json');
      request.send();

      // this.setState({ loading: false });
    };

    _getLocationAsync();
    // request.open('GET', 'https://toucan-v1-6245e.firebaseio.com/events.json');
    // request.send();
  }

  render() {
    if (this.state.loading) {
      // not a fan of having two different render containers
      //    here that do the same minus the loading indicator
      return (
        <Container style={{ backgroundColor: '#e8e8e8' }}>
          <Header androidStatusBarColor="#275667" iosBarStyle='light-content' style={styles.header}>
              <Left style={ styles.navButtons }>
                <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} style={styles.leftIcon} />
              </Left>
              <Body style={ { flex:1, justifyContent:'center', alignItems:'center' } }>
                <Title style={styles.navTitle}>Home</Title>
              </Body>
              <Right style={ styles.navButtons }>
                <Icon name="ios-add" onPress={() => this.props.navigation.navigate("AddEvent")} style={styles.rightIcon} />
              </Right>
          </Header>
          <ActivityIndicator
            style={{ paddingTop: height/2.6, }}
            size="large" color="#1E7898"
          />
        </Container>
      )
    }
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    return (
      <Container style={{ backgroundColor: '#e8e8e8' }}>
        <Header androidStatusBarColor="#275667" iosBarStyle='light-content' style={styles.header}>
            <Left style={ styles.navButtons }>
              <Icon name="ios-menu" onPress={() => this.props.navigation.openDrawer()} style={styles.leftIcon} />
            </Left>
            <Body style={ { flex:1, justifyContent:'center', alignItems:'center' } }>
              <Title style={styles.navTitle}>Home</Title>
            </Body>
            <Right style={ styles.navButtons }>
              <Icon name="ios-add" onPress={() => this.props.navigation.navigate("AddEvent")} style={styles.rightIcon} />
            </Right>
        </Header>
        <View style={styles.map}>
          <MapView 
            style={{width: width, height: height / 3}}
            initialRegion={{
              latitude: this.state.location.latitude,
              longitude: this.state.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0424,
            }}
          />
        </View>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* will probably be switching to FlatList from react-native */}
          <FlatList
              contentContainerStyle={{paddingLeft: 6, flexDirection:'row', flexDirection:'column', justifyContent:'space-around'}}
              numColumns={2}
              data={this.state.events}
              renderItem={({ item }) => 
                <Card style={styles.cards}>
                  <Button style={styles.cardBtn} onPress={() => this.props.navigation.navigate('Nest', {Selected_Event: item.uid})}>
                    <Text>{item.name}</Text>
                  </Button>
                </Card>
              }
              keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      alignContent: 'center',
      justifyContent: 'center',
    },
    content: {
      paddingTop: 10,
      paddingBottom: 35,
      alignItems: 'center',
      backgroundColor: '#e8e8e8',
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
    cards: {
      width: width / 2.2,
      aspectRatio: 3/4,
      backgroundColor: 'transparent',
      marginRight: 10,
      paddingBottom: 2,
    },
    cardBtn: {
      flex: 1, 
      width: width / 2.2,
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },
    map: {
      borderBottomWidth: 2,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    }
  });
