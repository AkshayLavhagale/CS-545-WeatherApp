const wDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const wMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const iconValue = {
    CLEARDAY: 'clear-day',
    CLEARNIGHT: 'clear-night',
    RAIN: 'rain',
    SNOW: 'snow',
    SLEET: 'sleet',
    WIND: 'wind',
    FOG: 'fog',
    CLOUDY: 'cloudy',
    PARTLY_CLOUDY_DAY: 'partly-cloudy-day',
    PARTLY_CLOUDY_NIGHT: 'partly-cloudy-night'
}
let summary = "";
// fetch the weather from the dark ski api
function fetchWeatherReport(apiKey, latitude, longitude) {

    //to avoid the cors issue you need to run through a proxy or make the call server side.
    // var DsProxyLink = `https://cors-anywhere.herokuapp.com/`;
    // var DsApiLink = `${DsProxyLink}https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?exclude=minutely,alerts,flags`;
    // var weatherapi = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            // Work with JSON data here
            console.log(data)
            var resultsHTML = "";
            var tableHTML = "";
            summary = data.weather[0].main;
            // data.main.temp = ((data.main.temp-273.15)*1.8)+32
            var temperature = data.main.temp;
            var icon = data.weather.icon;
            // var precipProbability = data.currently.precipProbability;
            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed
            var ts = new Date(data.dt * 1000);
            var forecastDate = `${wDay[ts.getDay()]} ${wMonth[ts.getMonth()]} ${ts.getDate()}`
            var city = data.name


            //Set values for the current conditions
            // document.getElementById("location").innerHTML = name;
            document.getElementById("dayTime").innerHTML = forecastDate;
            document.getElementById("summary").innerHTML = summary;
            document.getElementById("currentTemp").innerHTML = `${Math.round(temperature)}&deg`;
            document.getElementById("weatherIcon").src = getICON(icon);
            document.getElementById("perciptation").innerHTML = `Precipitation ${precipProbability*100}%`;
            document.getElementById("humidty").innerHTML = `Humidity ${Math.round(humidity*100)}%`;
            document.getElementById("wind").innerHTML = `Winds ${Math.round(windSpeed)} mph`;


            //render the forcasts tabs
            document.getElementById("dailyForecast").innerHTML = renderWeeklyForecast(data.daily);
            document.getElementById("weeklyForecast").innerHTML = renderDailyForecast(data.hourly);
        })
        .catch(err => {
            // Do something for an error here
            throw (`Sorry, An Error occured.  ${err}`);
        })
}

function fetchLocation(apiKey, latitude, longitude) {

    //you don't need a proxy but you need secure your key in the google developer console.
    // var googleApiLink = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    // console.log(googleApiLink)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            // Work with JSON data here
            console.log(data)
            //Set values for the location we picked the 4 object in the results becuase show the approximate address
            document.getElementById("location").innerHTML = data.name;
        })
        .catch(err => {
            // Do something for an error here
            throw (`Sorry, An Error occured.  ${err}`);
        })
}



//render the daily forecast
function renderDailyForecast(fcData) {

    let resultsHTML = "<tr><th>Time</th><th>Conditions</th><th>Temp</th><th>Precip</th></tr>";
    rowcount = fcData.data.length;
    if (rowcount > 8) {
        rowcount = 8;
    }

    for (i = 0; i < rowcount; i++) {

        let ts = new Date(fcData.data[i].time * 1000);
        let summary = "";
        let tempHigh = 0;
        let timeValue;

        //unix time needs to be formatted for display
        let hours = ts.getHours();
        if (hours > 0 && hours <= 12) {
            timeValue = "" + hours;
        } else if (hours > 12) {
            timeValue = "" + (hours - 12);
        } else if (hours == 0) {
            timeValue = "12";
        }
        timeValue += (hours >= 12) ? " PM" : " AM"; // get AM/PM

        summary = fcData.data[i].summary;
        tempHigh = `${Math.round(fcData.data[i].temperature)}&deg`;
        let precipProbability = `${Math.round(fcData.data[i].precipProbability * 100)}%`;
        resultsHTML += renderRow(timeValue, summary, tempHigh, precipProbability);

    }

    return resultsHTML;
}

//render the weekly forecast
function renderWeeklyForecast(fcData) {

    let resultsHTML = "<tr><th>Day</th><th>Conditions</th><th>Hi</th><th>Lo</th></tr>";
    rowcount = fcData.data.length;
    if (rowcount > 8) {
        rowcount = 8;
    }

    for (i = 0; i < rowcount; i++) {

        let ts = new Date(fcData.data[i].time * 1000);

        let dayTime = wDay[ts.getDay()];
        let summary = fcData.data[i].summary;
        let tempHigh = `${Math.round(fcData.data[i].temperatureHigh)}&deg`;
        let tempLow = `${Math.round(fcData.data[i].temperatureLow)}&deg`;

        resultsHTML += renderRow(dayTime, summary, tempHigh, tempLow);
    }

    return resultsHTML;
}

//template function to render grid colums
function renderRow(dayTime, summary, tempHigh, colVal4) {
    return `<tr><td>${dayTime}</td><td>${summary}</td><td>${tempHigh}</td><td>${colVal4}</td></tr>`
}

//render the correct icon
function getICON(icon) {
    switch (icon) {
        case iconValue.CLEARDAY:
            return "images/SunnyDay.png";

        case iconValue.CLOUDY:
        case iconValue.PARTLY_CLOUDY_DAY:
            return "images/MostlySunny.png";

        case iconValue.CLEARNIGHT:
            return "images/ClearMoon.png";

        case iconValue.PARTLY_CLOUDY_NIGHT:
            return "images/CloudyMoon.png";
        case iconValue.RAIN:
            return "images/Rain.png";

        case iconValue.SNOW:
            return "images/SNOW.png";

        case iconValue.SLEET:
            return "images/Sleet.png";

        default:
            return "images/SunnyDay.png";


    }
}

//try and location the user
function initGeolocation() {
    if (navigator.geolocation) {
        // Call getCurrentPosition with success and failure callbacks
        navigator.geolocation.getCurrentPosition(success, fail);
    } else {
        alert("Sorry, your browser does not support geolocation services.");
    }
}

//if naviation is available show weather for the current location
function success(position) {

    //ADD your keys here. My keys are located in a key.js file but are not included in the sample code for security reasons.
    var dsKey = "45c1fbcec6657b010bf10790f3277dfb";
    // var googleApiKey= "AIzaSyBNucY7rjJ61ZN3RwX-U3I8GM55hgxFU80";
    fetchLocation(dsKey, position.coords.latitude, position.coords.longitude)
    fetchWeatherReport(dsKey, position.coords.latitude, position.coords.longitude)
}

function fail() {

    //You could default to your favorite city like Kernersville, NC the home of Coder Foundry!
    alert("Sorry, your browser does not support geolocation services.");
}


// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://community-open-weather-map.p.rapidapi.com/weather?q=London%2Cuk&lat=0&lon=0&callback=test&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "0c2cb3a7b3msh8087c9c5d055d4ep127e47jsn215f689675a4",
// 		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
// 	}
// };
//
// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });
//
// function fhwllo() {
//     var hi = "hi";
//     console.log("Hello, World!!")
// }

function speech(){
    responsiveVoice.speak(`The weather today is ${summary}`);
}