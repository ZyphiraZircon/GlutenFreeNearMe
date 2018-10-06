import React from "react";
import { StatusBar } from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, Thumbnail, Image } from "native-base";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as restaurantActions from '../actions/restaurantActions';

class ResultsScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      images: [],
      updatedImages: false
    };
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
            <Card key={index}>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: place.icon}} />
                  <Body>
                    <Text>{place.name}</Text>
                    <Text note>{place.formatted_address}</Text>
                  </Body>
                </Left>
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
                  { place.price_level === 1 ? <Text note>$$$$</Text> : null }
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
          ))}
        </Content>
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
