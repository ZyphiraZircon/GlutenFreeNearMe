export default function restaurantReducer(state = [], action) {
  switch (action.type) {
    case 'LOAD_RESTAURANTS_SUCCESS':
      return action.restaurants;
    default:
      return state;
  }
}
