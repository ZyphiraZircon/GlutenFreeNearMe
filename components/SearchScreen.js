import React from "react";
import { StatusBar } from "react-native";
import { Container, Button, Content, Text } from "native-base";

export default class SearchScreen extends React.Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Button full rounded dark
                  style={{ marginTop: 10 }}
                  onPress={() => this.props.navigation.navigate("Results")}>
            <Text>Search (Test)</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
