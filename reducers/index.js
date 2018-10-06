import { combineReducers } from 'redux';
import restaurants from './restaurantReducer';

const rootReducer = combineReducers({
  restaurants,
});

export default rootReducer;
