import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SearchScreen from './components/SearchScreen';
import ResultsScreen from './components/ResultsScreen';

const RootRouter = StackNavigator(
  {
    Search: { screen: SearchScreen },
    Results: { screen: ResultsScreen }
  },
  {
    headerMode: 'none'
  }
);


export default class App extends Component {
  render() {
    return (
      <RootRouter />
    );
  }
}
