import * as keys from '../keys';

export function loadRestaurantsSuccess(restaurants) {
  return { type: 'LOAD_RESTAURANTS_SUCCESS', restaurants };
}

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lati1, long1, lati2, long2) {
  let R = 6371; // km
  let dLat = toRad(lati2 - lati1);
  let dLon = toRad(long2 - long1);
  let lat1 = toRad(lati1);
  let lat2 = toRad(lati2);

  let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return Value * Math.PI / 180;
}

// sorting by miles away
function compare(a,b) {
  if (a.milesAway < b.milesAway)
    return -1;
  if (a.milesAway > b.milesAway)
    return 1;
  return 0;
}

export function searchRestaurants(params, callback) {
  return (dispatch) => {
    let searchTerm = params.searchTerm;
    let radius = params.radius;
    let latitude = params.latitude;
    let longitude = params.longitude;

    if (searchTerm) {
      searchTerm = 'gluten free ' + searchTerm;
    } else {
      searchTerm = 'gluten free foods';
    }
    let encodedSearchTerm = encodeURIComponent(searchTerm);

    let radiusMeters = Number(radius) / 0.00062137;

    let host = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + encodedSearchTerm + '&location=' + latitude + ',' + longitude + '&radius=' + radiusMeters + '&key=' + keys.GOOGLE_KEY;
    // alert(encodedSearchTerm);
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
      if (results.results) {
        // doing distance calculations
        let foodArray = results.results;
        for (let i = 0; i < foodArray.length; i++) {
          console.log(i);
          if (foodArray[i].geometry && foodArray[i].geometry.location) {
            let difference = calcCrow(foodArray[i].geometry.location.lat, foodArray[i].geometry.location.lng, latitude, longitude);
            // convert to  miles
            difference = difference * 0.62137;
            // trim off decimals
            difference = Number(difference.toFixed(1));
            foodArray[i].milesAway = difference;
          } else {
            foodArray[i].milesAway = 0;
          }
        }
        foodArray.sort(compare);


        dispatch(loadRestaurantsSuccess(foodArray));
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
