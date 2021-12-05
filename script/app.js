'use strict';

const API_KEY = 'Xfrjfj3HCJU42R9kPLNUPxj9RDJG6oYP';
let city;
//#region ***  DOM references ***
let htmlBody, htmlDarkModebtn, htmlCity, htmlWeatherIcon, htmlWeatherPhrase, htmlTemp, htmlRealTemp, htmlUVIndex, htmlAQI, htmlWindSpeed
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
    // get longPhrase;
    setWeather(jsonWeather.DailyForecasts[0].Day.LongPhrase.toLowerCase());
    // fill in data
    htmlCity.innerHTML = city;
    htmlWeatherPhrase.innerHTML = jsonWeather.DailyForecasts[0].Day.ShortPhrase;
    htmlTemp.Text = Math.round(jsonWeather.DailyForecasts[0].Temperature.Maximum.Value);
    htmlRealTemp.innerHTML = Math.round(jsonWeather.DailyForecasts[0].RealFeelTemperature.Maximum.Value);
    htmlUVIndex.innerHTML = jsonWeather.DailyForecasts[0].AirAndPollen[5].Category;
    htmlAQI.innerHTML = jsonWeather.DailyForecasts[0].AirAndPollen[0].Category;
    htmlWindSpeed.innerHTML = jsonWeather.DailyForecasts[0].Day.Wind.Speed.Value;

    // ease in the weather container
    document.querySelector('.o-container--primary').classList.remove('o-container--hidden');
    document.querySelector('.o-container--secondary').classList.remove('o-container--hidden');

}

let weather = (weather) => { // debug function
    console.log(weather.toLowerCase());
    setWeather(weather.toLowerCase());
}


//#region ***  Event Listeners - listenTo___ ***
let listenToDarkMode = () => {
    htmlDarkModebtn.addEventListener('click', () => {
        // toggle dark mode
        console.log('dark mode');
        htmlBody.classList.toggle('dark-mode');
    })
}
//#endregion

//#region ***  Extra functions ***
let setWeather = (weatherType) => {
    htmlBody.className = '';
    if (weatherType.includes('rain') || weatherType.includes('shower')) {
        htmlBody.classList.add('is-rainy');
        htmlWeatherIcon.innerHTML = `<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M194.969 98.1333C194.99 97.5017 195 96.8674 195 96.2307C195 65.1647 170.152 39.9807 139.5 39.9807C115.185 39.9807 94.5218 55.8284 87.0176 77.8886C81.6283 75.0382 75.4999 73.4266 69 73.4266C47.4609 73.4266 30 91.1235 30 112.954C30 134.784 47.4609 152.481 69 152.481L139.5 152.481C139.525 152.481 139.55 152.481 139.575 152.481H181.5C197.24 152.481 210 139.548 210 123.596C210 112.58 203.917 103.005 194.969 98.1333Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M115.402 166.71C116.255 164.083 119.076 162.646 121.702 163.499C124.328 164.353 125.766 167.174 124.912 169.8L107.876 222.233C107.022 224.859 104.202 226.297 101.575 225.443C98.9491 224.59 97.5118 221.769 98.3651 219.143L115.402 166.71ZM135.534 166.71C136.387 164.083 139.208 162.646 141.834 163.499C144.461 164.353 145.898 167.174 145.045 169.8L132.125 209.563C131.272 212.189 128.451 213.626 125.824 212.773C123.198 211.92 121.761 209.099 122.614 206.473L135.534 166.71ZM101.57 163.499C98.9438 162.646 96.123 164.083 95.2697 166.71L86.4668 193.802C85.6134 196.429 87.0507 199.249 89.677 200.103C92.3032 200.956 95.124 199.519 95.9773 196.892L104.78 169.8C105.634 167.174 104.196 164.353 101.57 163.499Z" fill="#B4F5F2"/>
                </svg>`;
        return
    } else if (weatherType.includes('snow')) {
        htmlBody.classList.add('is-snowy');
        htmlWeatherIcon.innerHTML = `<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M195 95.7143C195 96.3449 194.99 96.9731 194.969 97.5987C203.917 102.424 210 111.908 210 122.818C210 138.619 197.24 151.429 181.5 151.429H139.575L139.5 151.429H138.365C139.124 150.901 143.87 147.602 145.121 146.776C147.544 148.434 150.803 148.666 153.517 147.103C156.267 145.519 157.697 142.528 157.42 139.566C159.019 138.628 159.069 138.724 159.069 138.724C162.827 136.56 164.116 131.753 161.944 128C159.772 124.249 154.958 122.954 151.194 125.121C151.194 125.121 151.018 125.257 149.49 126.019C147.072 124.392 143.839 124.174 141.143 125.727C138.415 127.298 136.986 130.255 137.234 133.194C135.833 134.03 129.875 137.647 129.875 137.647C129.875 137.647 129.891 129.943 129.958 128.886C132.574 127.609 134.374 124.93 134.374 121.829C134.374 118.692 132.526 115.982 129.857 114.725C129.896 113.348 129.875 112.845 129.875 112.845C129.875 108.517 126.345 105 122 105C117.657 105 114.125 108.51 114.125 112.845C114.125 112.845 114.145 113.011 114.132 114.729C111.468 115.988 109.626 118.693 109.626 121.829C109.626 124.977 111.486 127.694 114.17 128.946C114.097 131.009 114.125 137.647 114.125 137.647C114.125 137.647 108.251 134.188 106.772 133.141C106.999 130.219 105.571 127.29 102.857 125.727C100.152 124.169 96.901 124.396 94.479 126.042C92.95 125.273 92.8061 125.121 92.8061 125.121C89.0481 122.957 84.229 124.247 82.0564 128C79.8847 131.751 81.1673 136.557 84.9314 138.724C84.9314 138.724 85.2887 138.723 86.5738 139.618C86.3178 142.563 87.7466 145.527 90.4827 147.103C93.2088 148.672 96.4882 148.43 98.9159 146.749C99.6612 147.35 105.709 150.881 106.649 151.429L69 151.429C47.4609 151.429 30 133.9 30 112.278C30 90.6557 47.4609 73.1274 69 73.1274C75.4999 73.1274 81.6283 74.7236 87.0176 77.5468C94.5218 55.6968 115.185 40 139.5 40C170.152 40 195 64.9441 195 95.7143Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M118.731 175.869V125.917H117.645C115.837 125.917 114.372 124.455 114.372 122.659C114.372 120.86 115.835 119.402 117.645 119.402H118.731V113.964C118.731 112.169 120.198 110.714 122 110.714C123.806 110.714 125.269 112.178 125.269 113.964V119.402H126.355C128.163 119.402 129.628 120.864 129.628 122.659C129.628 124.459 128.166 125.917 126.355 125.917H125.269V175.869H126.355C128.163 175.869 129.628 177.331 129.628 179.127C129.628 180.926 128.166 182.384 126.355 182.384H125.269V187.822C125.269 189.617 123.802 191.071 122 191.071C120.195 191.071 118.731 189.608 118.731 187.822V182.384H117.645C115.837 182.384 114.372 180.922 114.372 179.127C114.372 177.327 115.835 175.869 117.645 175.869H118.731Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M101.929 135.584L145.341 160.56L145.884 159.622C146.788 158.062 148.791 157.529 150.352 158.427C151.915 159.326 152.451 161.318 151.546 162.88L151.003 163.817L155.729 166.536C157.289 167.433 157.82 169.427 156.919 170.982C156.016 172.54 154.012 173.072 152.46 172.179L147.734 169.46L147.191 170.397C146.287 171.957 144.284 172.49 142.723 171.593C141.16 170.693 140.624 168.701 141.529 167.139L142.072 166.202L98.6595 141.226L98.1165 142.164C97.2127 143.723 95.2093 144.257 93.6488 143.359C92.0852 142.459 91.549 140.468 92.454 138.906L92.9971 137.969L88.2713 135.25C86.7115 134.352 86.1808 132.359 87.0817 130.804C87.9845 129.245 89.9881 128.714 91.5405 129.607L96.2663 132.326L96.8093 131.389C97.7131 129.829 99.7165 129.295 101.277 130.193C102.841 131.093 103.377 133.084 102.472 134.646L101.929 135.584Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M145.341 141.226L101.929 166.202L102.472 167.139C103.375 168.699 102.837 170.695 101.277 171.593C99.7133 172.492 97.7143 171.959 96.8093 170.397L96.2662 169.46L91.5405 172.179C89.9807 173.076 87.9826 172.537 87.0817 170.982C86.1789 169.424 86.7188 167.429 88.2712 166.536L92.997 163.817L92.454 162.88C91.5502 161.32 92.0883 159.325 93.6487 158.427C95.2124 157.527 97.2114 158.06 98.1164 159.622L98.6595 160.56L142.072 135.584L141.529 134.646C140.625 133.087 141.163 131.091 142.723 130.193C144.287 129.294 146.286 129.827 147.191 131.389L147.734 132.326L152.46 129.607C154.02 128.71 156.018 129.249 156.919 130.804C157.821 132.362 157.281 134.357 155.729 135.25L151.003 137.969L151.546 138.906C152.45 140.466 151.912 142.461 150.352 143.359C148.788 144.259 146.789 143.726 145.884 142.164L145.341 141.226Z" fill="white"/>
        </svg>`;
        return
    } else if (weatherType.includes('cloud')) {
        htmlBody.classList.add('is-cloudy');
        htmlWeatherIcon.innerHTML = `<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M194.969 107.599C194.99 106.973 195 106.345 195 105.714C195 74.9441 170.152 50 139.5 50C115.185 50 94.5218 65.6968 87.0176 87.5468C81.6283 84.7236 75.4999 83.1274 69 83.1274C47.4609 83.1274 30 100.656 30 122.278C30 143.9 47.4609 161.429 69 161.429L139.575 161.429H181.5C197.24 161.429 210 148.619 210 132.818C210 121.908 203.917 112.424 194.969 107.599Z" fill="white"/>
                </svg>`;
        return
    } else if (weatherType.includes('sun') || weatherType.includes('clear')) {
        htmlBody.classList.add('is-sunny');
        htmlWeatherIcon.innerHTML = `<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M120 207C168.049 207 207 168.049 207 120C207 71.9512 168.049 33 120 33C71.9512 33 33 71.9512 33 120C33 168.049 71.9512 207 120 207ZM210 120C210 169.706 169.706 210 120 210C70.2944 210 30 169.706 30 120C30 70.2944 70.2944 30 120 30C169.706 30 210 70.2944 210 120Z" fill="#FFF308" fill-opacity="0.2"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M119.5 195C161.198 195 195 161.198 195 119.5C195 77.8025 161.198 44 119.5 44C77.8025 44 44 77.8025 44 119.5C44 161.198 77.8025 195 119.5 195ZM199 119.5C199 163.407 163.407 199 119.5 199C75.5934 199 40 163.407 40 119.5C40 75.5934 75.5934 40 119.5 40C163.407 40 199 75.5934 199 119.5Z" fill="#FFF308" fill-opacity="0.6"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M119.5 187C156.779 187 187 156.779 187 119.5C187 82.2208 156.779 52 119.5 52C82.2208 52 52 82.2208 52 119.5C52 156.779 82.2208 187 119.5 187Z" fill="#FFEC65"/>
            </svg>`;
        return
    }
}
//#endregion

//#region ***  INIT / DOMContentLoaded  ***
document.addEventListener('DOMContentLoaded', function () {
    // get references to DOM elements
    htmlBody = document.querySelector('body');
    htmlCity = document.querySelector('.js-city');
    htmlWeatherIcon = document.querySelector('.js-weatherIcon');
    htmlWeatherPhrase = document.querySelector('.js-weatherPhrase');
    htmlTemp = document.querySelector('.js-temp');
    htmlRealTemp = document.querySelector('.js-realTemp');
    htmlWindSpeed = document.querySelector('.js-windSpeed');
    htmlUVIndex = document.querySelector('.js-uvIndex');
    htmlAQI = document.querySelector('.js-aqi');
    htmlDarkModebtn = document.querySelector('#checkbox');

    // start listeners
    listenToDarkMode();


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