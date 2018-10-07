import React from "react";
import { StatusBar, Dimensions, View } from "react-native";
import { Container, Button, Text, Form, Item, Input, Picker, Icon } from "native-base";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as restaurantActions from '../actions/restaurantActions';

class SearchScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      useCurrentLocation: true,
      searchTerm: '',
      radius: '25',
      customLocation: '',
      latitude: '',
      longitude: '',
      error: ''
    };
    this.updateValues = this.updateValues.bind(this);
    this.toggleCustomLocation = this.toggleCustomLocation.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.searchCallback = this.searchCallback.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  updateValues(name, text) {
    this.setState({ [name]: text });
  }

  toggleCustomLocation(bool) {
    this.setState({ useCurrentLocation: bool });
  }

  doSearch() {
    this.props.actions.restaurant.searchRestaurants(this.state, this.searchCallback);
  }

  searchCallback(bool) {
    if (bool) {
      this.props.navigation.navigate("Results");
    } else {
      alert('There was an error.');
    }
  }

  render() {

    const { height: screenHeight } = Dimensions.get('window');

    const styles = {
      container: {
        flex: 1,
        height: (screenHeight),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecd9c6'
      },
      logoText: {
        color: '#004c66',
        fontFamily: 'Roboto',
        textAlign: 'center',
        fontSize: 32,
      },
      topLogo: {
        position: 'absolute',
        top: 100
      },
      bottomButton: {
        position: 'absolute',
        top: 550
      },
      bigText: {
        textAlign: 'center',
        margin: 20,
        color: '#004c66',
        fontFamily: 'Roboto',
        fontWeight: '600',
        fontSize: 18
      },
      button: {
        marginTop: 10,
        backgroundColor: '#004c66',
      },
      buttonText: {
        fontFamily: 'Roboto',
        fontWeight: '600',
        fontSize: 18
      }
    };

    return (
      <Container>
        <View style={styles.container}>
          <View style={styles.topLogo}>
            <Text style={styles.logoText}>GLUTEN-FREE</Text>
            <Text style={styles.logoText}>NEAR ME</Text>
          </View>
          <View style={{ position: 'absolute', top: 250, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.bigText}>I'm hungry for</Text>
            <Form style={{ margin: 'auto', paddingTop: 0, paddingLeft: 20, paddingRight: 20, width: '100%' }}>
              <Item
                style={{ borderColor: 'black', borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center' }}
                underline
              >
                <Input
                  onChangeText={text => this.updateValues('searchTerm', text)}
                  value={this.state.searchTerm}
                  style={{ color: '#333333', fontFamily: 'Roboto', textAlign: 'center' }}
                  placeholderTextColor={'#777777'}
                  // placeholder="(leave blank if you don't know)"
                  autoCapitalize={'none'}
                />
              </Item>
              <Text style={styles.bigText}>within</Text>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Item picker
                  style={{ width: 150 }}
                  underline={false}
                >
                  <Picker
                    mode="dropdown"
                    // iosIcon={<Icon name="ios-arrow-down-outline" />}
                    style={{ width: '100%' }}
                    placeholder="Radius"
                    placeholderStyle={{ }}
                    // placeholderIconColor="#007aff"
                    selectedValue={this.state.radius}
                    onValueChange={(value) => this.updateValues('radius', value)}
                  >
                    <Picker.Item label="5 miles" value="5" />
                    <Picker.Item label="10 miles" value="10" />
                    <Picker.Item label="25 miles" value="25" />
                    <Picker.Item label="50 miles" value="50" />
                    <Picker.Item label="100 miles" value="100" />
                  </Picker>
                </Item>
              </View>
              <Text style={styles.bigText}>of me.</Text>
            </Form>
          </View>
          <View style={styles.bottomButton}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Button
                      style={styles.button}
                      onPress={() => this.doSearch()}>
                <Text style={styles.buttonText}>SEARCH</Text>
              </Button>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    restaurants: state.restaurants
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      restaurant: bindActionCreators(restaurantActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
