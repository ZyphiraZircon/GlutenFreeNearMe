import React, {Component} from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import GlutenFreeApp from './GlutenFreeApp';
const store = configureStore();

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <GlutenFreeApp />
      </Provider>
    );
  }
}
