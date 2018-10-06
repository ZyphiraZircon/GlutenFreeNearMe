import * as keys from '../keys';

export function loadRestaurantsSuccess(restaurants) {
  return { type: 'LOAD_RESTAURANTS_SUCCESS', restaurants };
}

export function searchRestaurants(params, callback) {
  return (dispatch) => {
    let searchTerm = params.searchTerm;
    let radius = params.radius;
    let latitude = params.latitude;
    let longitude = params.longitude;

    let encodedSearchTerm = encodeURIComponent('gluten free ' + searchTerm);

    let radiusMeters = Number(radius) / 0.00062137;

    let host = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + encodedSearchTerm + '&location=' + latitude + ',' + longitude + '&radius=' + radiusMeters + '&key=' + keys.GOOGLE_KEY;
    // alert(host);
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
      console.log();
      console.log(JSON.stringify(results.results[0]));
      console.log();
      if (results.results) {
        dispatch(loadRestaurantsSuccess(results.results));
        if (callback) {
          callback(true);
        }
      } else {
        if (callback) {
          callback(false);
        }
      }
    })
    .catch((error) => {
      throw (error);
    });
  };
}
