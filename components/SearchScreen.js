import React from "react";
import { StatusBar, Dimensions, View } from "react-native";
import { Container, Button, Text, Form, Item, Input, Picker, Row, Col } from "native-base";

export default class SearchScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      useCurrentLocation: true,
      searchTerm: '',
      radius: '5',
      customLocation: ''
    };
    this.updateValues = this.updateValues.bind(this);
    this.toggleCustomLocation = this.toggleCustomLocation.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }

  updateValues(name, text) {
    this.setState({ [name]: text });
  }

  toggleCustomLocation(bool) {
    this.setState({ useCurrentLocation: bool });
  }

  doSearch() {
    alert(this.state.searchTerm);
    // this.props.navigation.navigate("Results");
  }

  render() {

    const { height: screenHeight } = Dimensions.get('window');

    const styles = {
      container: {
        flex: 1,
        height: (screenHeight),
        alignItems: 'center',
        justifyContent: 'center'
      },
      logoText: {
        color: '#333333',
        fontFamily: 'Arial',
        textAlign: 'center',
        fontSize: 28,
        marginBottom: 100
      },
      topLogo: {
        position: 'absolute',
        top: 100
      },
      bottomButton: {
        position: 'absolute',
        bottom: 20
        // shadowColor: '#000000',
        // shadowOffset: {
        //  height: 1,
        //  width: 1,
        // },
        // shadowRadius: 5,
        // shadowOpacity: 0.3,
      },
    };

    return (
      <Container>
        <View style={styles.container}>
          <View style={styles.topLogo}>
            <Text style={styles.logoText}>GLUTEN-FREE NEAR ME</Text>
          </View>
          <View style={{ position: 'absolute', top: 250, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', margin: 20 }}>I'm hungry for</Text>
            <Form style={{ margin: 'auto', paddingTop: 0, paddingLeft: 20, paddingRight: 20, width: '100%' }}>
              <Item
                style={{ borderColor: 'black', borderBottomWidth: 1 }}
                underline
              >
                <Input
                  onChangeText={text => this.updateValues('searchTerm', text)}
                  value={this.state.searchTerm}
                  style={{ color: '#333333', fontFamily: 'Arial' }}
                  placeholderTextColor={'#777777'}
                  placeholder="(Leave blank if you don't know)"
                  autoCapitalize={'none'}
                />
              </Item>
              <Text style={{ textAlign: 'center', margin: 20 }}>within</Text>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Item picker
                  style={{ width: 100 }}
                  underline={false}
                >
                  <Picker
                    mode="dropdown"
                    // iosIcon={<Icon name="ios-arrow-down-outline" />}
                    // style={{ lineHeight: 1 }}
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
              <Text style={{ textAlign: 'center', margin: 20 }}>of</Text>
              { this.state.useCurrentLocation ? <Button
                  block
                  bordered
                  style={{ marginTop: 10 }}
                  onPress={() => this.toggleCustomLocation(false)}>
                  <Text>Current Location</Text>
                </Button> : <View>
                <Item
                  style={{ borderColor: 'black', borderBottomWidth: 1 }}
                  underline
                >
                  <Input
                    onChangeText={text => this.updateValues('customLocation', text)}
                    value={this.state.customLocation}
                    style={{ color: '#333333', fontFamily: 'Arial' }}
                    placeholderTextColor={'#777777'}
                    placeholder="Enter a location"
                  />
                </Item>
                <Button
                  block
                  bordered
                  style={{ marginTop: 10 }}
                  onPress={() => this.toggleCustomLocation(true)}>
                  <Text>Use Current Location</Text>
                </Button>
              </View>}
            </Form>
          </View>
          <View style={styles.bottomButton}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Button
                      style={{ marginTop: 10 }}
                      onPress={() => this.doSearch()}>
                <Text>Search (Test)</Text>
              </Button>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}
