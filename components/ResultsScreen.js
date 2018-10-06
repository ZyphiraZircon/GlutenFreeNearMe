import React from "react";
import { StatusBar, Modal, TouchableOpacity, TouchableHighlight, View, Linking } from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, Thumbnail, Spinner } from "native-base";
import PopupDialog, { ScaleAnimation, DialogTitle } from 'react-native-popup-dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as restaurantActions from '../actions/restaurantActions';
import * as keys from '../keys';

const scaleAnimation = new ScaleAnimation({
  useNativeDriver: true, // optional
});

class ResultsScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      modal: false,
      loadingDetails: false,
      details: {},
      selectedPlace: {}
    };
    this.showDetailsModal = this.showDetailsModal.bind(this);
    this.hideDetailsModal = this.hideDetailsModal.bind(this);
    this.fetchDetails = this.fetchDetails.bind(this);
    this.openMaps = this.openMaps.bind(this);
    this.callNumber = this.callNumber.bind(this);
  }

  showDetailsModal(place) {
    this.popupDialog.show();
    this.setState({ selectedPlace: place, loadingDetails: true }, () => this.fetchDetails(place));
  }

  hideDetailsModal(){
    this.setState({ modal: false });
  }

  fetchDetails(place) {
    let host = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + place.place_id + '&fields=name,formatted_address,formatted_phone_number&key=' + keys.GOOGLE_KEY;
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'get',
    };
    fetch(host, options).then(response =>
      response.json()
    ).then((results) => {
      // alert(JSON.stringify(results));
      if (results.result) {
        this.setState({ details: results.result, loadingDetails: false });
      }
    })
    .catch((error) => {
      throw (error);
    });
  }

  openMaps() {
    const url = 'http://maps.google.com/maps?daddr=' + encodeURIComponent(this.state.details.formatted_address);
    // alert(url);
    Linking.openURL(url);
  }

  callNumber() {
    const cleanedNumber = this.state.details.formatted_phone_number.replace(/\D/g,'');
    const url = 'tel:' + '+' + cleanedNumber;
    // alert(url);
    Linking.openURL(url);
  }

  render() {
    const styles = {
      header: {
        backgroundColor: '#d9b38c'
      },
      content: {
        backgroundColor: '#ecd9c6'
      },
      title: {
        color: '#004c66',
        fontFamily: 'Roboto',
        fontWeight: '600',
      },
      bottomButton: {
        position: 'absolute',
        bottom: 20
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
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Search")}>
              <Icon active name="md-arrow-back" style={{ color: '#004c66' }}/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Food Near Me</Title>
          </Body>
          <Right />
        </Header>
        <Content padder style={styles.content}>
          { this.props.restaurants.map((place, index) => (
            <TouchableOpacity key={index} onPress={() => this.showDetailsModal(place)}>
              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri: place.icon}} />
                    <Body>
                      <Text>{place.name}</Text>
                      <Text note>{place.formatted_address}</Text>
                    </Body>
                  </Left>
                  <Right>
                    <Text>{place.milesAway} miles away</Text>
                  </Right>
                </CardItem>
                <CardItem style={{ backgroundColor: '#FAFAFA'}}>
                  <Left>
                    <Button transparent>
                      <Icon active name="star" style={{ color: '#e6a800'}} />
                      <Text style={{ color: '#e6a800'}}>{place.rating}</Text>
                    </Button>
                  </Left>
                  <Body>
                  <Button transparent>
                    { place.price_level === 0 ? <Text note>$$$$</Text> : null }
                    { place.price_level === 1 ? <Text style={{ color: '#333333'}}>$<Text note>$$$</Text></Text> : null }
                    { place.price_level === 2 ? <Text style={{ color: '#333333'}}>$$<Text note>$$</Text></Text> : null }
                    { place.price_level === 3 ? <Text style={{ color: '#333333'}}>$$$<Text note>$</Text></Text> : null }
                    { place.price_level === 4 ? <Text style={{ color: '#333333'}}>$$$$</Text> : null }
                  </Button>
                  </Body>
                  <Right>
                    { place.opening_hours && place.opening_hours.open_now ? <Text style={{ color: '#007700' }}>Open</Text> : <Text style={{ color: '#770000' }}>Closed</Text> }
                  </Right>
                </CardItem>
              </Card>
            </TouchableOpacity>
          ))}
        </Content>

        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation={scaleAnimation}
          dialogTitle={<DialogTitle title={this.state.selectedPlace.name} />}
        >
          <View style={{ padding: 50 }}>
            { this.state.loadingDetails ? <View>
              <Spinner color='#004c66' />
            </View> : <View>
              <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => this.openMaps()}>
                  <Text style={{ textAlign: 'center', color: '#004c66' }}>{this.state.details.formatted_address}</Text>
                  <Text style={{ textAlign: 'center', fontSize: 12, marginTop: 5 }}>Click for directions</Text>
                </TouchableOpacity>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 20 }}>
                <Button
                  style={styles.button}
                  onPress={() => this.callNumber()}
                >
                  <Text style={styles.buttonText}>CALL {this.state.details.formatted_phone_number}</Text>
                </Button>
              </View>
            </View> }
          </View>
        </PopupDialog>

      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    restaurants: state.restaurants
    // https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      restaurant: bindActionCreators(restaurantActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsScreen);
