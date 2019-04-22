import React from 'react';
import { AppRegistry, Animated, Image, StyleSheet, Text, View, Dimensions, ScrollView, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Title, Body, Right, Card } from 'native-base';
import { Constants, Location, Permissions } from 'expo';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';

const { width, height } = Dimensions.get('window');

const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;


export default class HomeScreen extends React.Component {


  constructor(props) {
    super(props);

    this.state = ({
      loading: true,
      user: '',
      email: '',
      events: [],
      location: {
          latitude: 38.9717,
          longitude: -95.2353,
        },
      errorMessage: null,
      markers: [
	{
	  coordinate: {
	    latitude: 37.827897,
	    longitude: -122.372439,
	  },
	  title: "Fintech Friday",
	  description: "This is the best place in Portland",
	  image: Images[0],
	},
	{
	  coordinate: {
	    latitude: 37.795204,
	    longitude:  -122.464502,
	  },
	  title: "Second Best Place",
	  description: "This is the second best place in Portland",
	  image: Images[1],
	},
	{
	  coordinate: {
	    latitude: 37.784432,
	    longitude: -122.410301,
	  },
	  title: "Third Best Place",
	  description: "This is the third best place in Portland",
	  image: Images[2],
	},
	{
	  coordinate: {
	    latitude:  37.818269,
	    longitude: -122.478967,
	  },
	  title: "Fourth Best Place",
	  description: "This is the fourth best place in Portland",
	  image: Images[3],
	},
      ],
      region: {
	latitudeDelta: 0.04864195044303443,
	longitudeDelta: 0.040142817690068,
      },
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

  componentWillMount() {
      this.index = 0;
      this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

   render() {

    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
	(index - 1) * CARD_WIDTH,
	index * CARD_WIDTH,
	((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
	inputRange,
	outputRange: [1, 2.5, 1],
	extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
	inputRange,
	outputRange: [0.35, 1, 0.35],
	extrapolate: "clamp",
      });
      return { scale, opacity };
    });

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


        <View style={styles.container}>
          <MapView 
	    ref={map => this.map = map}
            initialRegion={{
              latitude: this.state.location.latitude,
              longitude: this.state.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0424,
            }}
	    style={styles.container}
          >
	    {this.state.markers.map((marker, index) => {
	      const scaleStyle = {
		transform: [
		  {
		    scale: interpolations[index].scale,
		  },
		],
	      };
	      const opacityStyle = {
		opacity: interpolations[index].opacity,
	      };
	      return (
		<MapView.Marker key={index} coordinate={marker.coordinate}>
		  <Animated.View style={[styles.markerWrap]}>
		    <Animated.View style={[styles.ring]} />
		    <View style={styles.marker} />
		  </Animated.View>
		</MapView.Marker>
	      );
	    })}
	  </MapView>
        </View>


	<Animated.ScrollView
	  horizontal
	  scrollEventThrottle={1}
	  showsHorizontalScrollIndicator={false}
	  snapToInterval={CARD_WIDTH}
	  onScroll={Animated.event(
	    [
	      {
		nativeEvent: {
		  contentOffset: {
		    x: this.animation,
		  },
		},
	      },
	    ],
	    { useNativeDriver: true }
	  )}
	  style={styles.scrollView}
	  contentContainerStyle={styles.endPadding}
	>
	  {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </View>
          ))}

	</Animated.ScrollView>
     
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      alignContent: 'center',
      justifyContent: 'center',
      flex: 1,
    },


    scrollView: {
      position: "absolute",
      bottom: 10,
      paddingVertical: 0,
    },
    endPadding: {
      paddingRight: width - CARD_WIDTH,
    },
    card: {
      padding: 0,
      elevation: 2,
      backgroundColor: "#FFF",
      marginHorizontal: 0,
      shadowColor: "#000",
      shadowRadius: 5,
      shadowOpacity: 0.3,
      shadowOffset: { x: 2, y: -2 },
      height: CARD_HEIGHT,
      width: CARD_WIDTH,
      overflow: "hidden",
    },
    cardImage: {
      flex: 3,
      width: "100%",
      height: "100%",
      alignSelf: "center",
    },
    textContent: {
      flex: 1,
    },
    cardtitle: {
      fontSize: 12,
      marginTop: 5,
      fontWeight: "bold",
    },
    cardDescription: {
      fontSize: 12,
      color: "#444",
    },




    content: {
      paddingTop: 0,
      paddingBottom: 0,
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
    },
    markerWrap: {
      alignItems: "center",
      justifyContent: "center",
    },
    marker: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "rgba(130,4,150, 0.9)",
    },
    ring: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: "rgba(130,4,150, 0.3)",
      position: "absolute",
      borderWidth: 1,
      borderColor: "rgba(130,4,150, 0.5)",
  },
  });

