'use strict';

const API_KEY = 'Xfrjfj3HCJU42R9kPLNUPxj9RDJG6oYP';
let city;
//#region ***  DOM references ***
//#endregion


//#region ***  Data Access - get___ ***
let getLocation = (lat, lon) => {
    console.log(lat, lon);
    // get location from api and return to callback
    fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`)
        .then(response => response.json())
        .then(jsonLocation => getWeather(jsonLocation))
}

let getWeather = (jsonLocation) => {
    console.log(jsonLocation);
    // store city name in global variable
    city = jsonLocation.LocalizedName;
    // get weather from api and return to callback
    fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${jsonLocation.Key}?apikey=${API_KEY}&details=true&metric=true`)
        .then(response => response.json())
        .then(jsonWeather => showForecast(jsonWeather))
}
//#endregion


//#region ***  Callback-Visualisation - show___ ***
let showForecast = (jsonWeather) => {
    // show forecast
    console.log(city);
    console.log(jsonWeather);
}
//#endregion


//#region ***  Event Listeners - listenTo___ ***
//#endregion


//#region ***  INIT / DOMContentLoaded  ***
document.addEventListener('DOMContentLoaded', function () {
    // ask for users location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            // get user location
            getLocation(position.coords.latitude, position.coords.longitude);
        }, null, { enableHighAccuracy: true });
    } else {
        // no location
        console.log('geolocation not supported');
    }
});
//#endregion