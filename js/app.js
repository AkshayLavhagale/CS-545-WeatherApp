const wDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const wMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let temp = "";
let weather="";
let windspeed="";
let city ="";
let humid = "";
// forecasticon = document.getElementById("forecast-icon");

// var isChecked=document.getElementById("switch").checked;
// console.log(isChecked);
(function($, document, window){
	
	$(document).ready(function(){

		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});

		var map = $(".map");
		var latitude = map.data("latitude");
		var longitude = map.data("longitude");
		if( map.length ){
			
			map.gmap3({
				map:{
					options:{
						center: [latitude,longitude],
						zoom: 15,
						scrollwheel: false
					}
				},
				marker:{
					latLng: [latitude,longitude],
				}
			});
			
		}
	});

	$(window).load(function(){

	});

})(jQuery, document, window);




function todaydate() {
	var date = new Date();
	console.log(date)

	var weekday = new Array(7);
	weekday[0] = "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";


	var month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";



	var today = date.getDate() ;
	var curmonth = month[date.getMonth()];
	var day = weekday[date.getDay()];
	console.log(day)
	var daymonth = today + " " +curmonth;

	document.getElementById("todaydate").innerHTML = daymonth;
	document.getElementById("day").innerHTML = day;
	document.getElementById("currtodaydate").innerHTML = daymonth;
	document.getElementById("currday").innerHTML = day;

}
//Getting Location and Weather Data!!
function fetchLocation(apiKey, latitude, longitude) {

    //you don't need a proxy but you need secure your key in the google developer console.
    // var googleApiLink = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    // console.log(googleApiLink)

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            // Work with JSON data here
            console.log(data)
            //Set values for the location we picked the 4 object in the results becuase show the approximate address
            document.getElementById("location").innerHTML = data.name;
            city = data.name;
            document.getElementById("currenttemp").innerHTML = data.main.temp;
            temp = data.main.temp;
            weather=data.weather[0].main;
            windspeed=data.wind.speed;
            humid = data.clouds.all;
			document.getElementById("wind_speed").innerHTML = data.wind.speed;
			document.getElementById("weather").innerHTML = data.weather[0].main;
			console.log(data.wind.speed, data.weather[0].main, humid)
			document.getElementById("humidity").innerHTML = humid;
			 document.getElementById("currlocation").innerHTML = data.name;
			document.getElementById("temp").innerHTML = data.main.temp;

			// var iconcode = data.weather[0].icon;
			console.log(data.weather[0].icon)
			var iconurl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
			console.log(iconurl)
			var locationicon = document.querySelector('.forecast-icon');
			locationicon.innerHTML = `<img src="${iconurl}" alt="" width=90>`
        })
        .catch(err => {
            // Do something for an error here
            throw (`Sorry, An Error occured.  ${err}`);
        })
}




// const CURRENT_LOCATION = document.getElementsByClassName('weather-content__overview')[0];
// const CURRENT_TEMP = document.getElementsByClassName('weather-content__temp')[0];
// const FORECAST = document.getElementsByClassName('component__forecast-box')[0];
// const proxyurl = "https://cors-anywhere.herokuapp.com/";
// const appid = 'e43f64ee98be9268f7a7f49e34aecfdf'; // use your own API KEY plz

// // Use Fetch API to GET data from OpenWeather API
// function getWeatherData(apikey,latitude,longitude) {
//   const headers = new Headers();
//   const URL = proxyurl + `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=7&units=metric&APPID=${apikey}`;
//
//   return fetch(URL, {
//     method: 'GET',
//     headers: headers
//   }).then(data => data.json());
// }
//
// /* TUTORIAL READERS:
// ** I am using an external resource for the icons and applying them
// ** here using a switch block; check the sidebar "Resources" to get
// ** the css if you want to use these icons
// */
// function applyIcon(icon) {
//   let selectedIcon;
//   switch (icon) {
//     case '01d':
//       selectedIcon = "wi-day-sunny"
//       break;
//     case '01n':
//       selectedIcon = "wi-night-clear"
//       break;
//     case '02d':
//     case '02n':
//       selectedIcon = "wi-cloudy"
//       break;
//     case '03d':
//     case '03n':
//     case '04d':
//     case '04n':
//       selectedIcon = "wi-night-cloudy"
//       break;
//     case '09d':
//     case '09n':
//       selectedIcon = "wi-showers"
//       break;
//     case '10d':
//     case '10n':
//       selectedIcon = "wi-rain"
//       break;
//     case '11d':
//     case '11n':
//       selectedIcon = "wi-thunderstorm"
//       break;
//     case '13d':
//     case '13n':
//       selectedIcon = "wi-snow"
//       break;
//     case '50d':
//     case '50n':
//       selectedIcon = "wi-fog"
//       break;
//     default:
//       selectedIcon = "wi-meteor"
//   }
//   return selectedIcon;
// }
//
// // Use returned json from promise to render daily forecast
// renderData = (location, forecast) => {
//   // render city, current weather description and temp
//   const currentWeather = forecast[0].weather[0];
//   const widgetHeader = `<h1>${location.name}</h1><small>${currentWeather.description}</small>`;
//   console.log()
//   console.log(forecast[0].temp.day)
//   CURRENT_TEMP.innerHTML = `<i class="wi ${applyIcon(currentWeather.icon)}"></i> ${Math.round(forecast[0].temp.day)} <i class="wi wi-degrees"></i>`;
//   CURRENT_LOCATION.innerHTML = widgetHeader;
//
// // render each daily forecast
//   forecast.forEach(day => {
//     let date = new Date(day.dt * 1000);
//     let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
//     let name = days[date.getDay()];
//     let dayBlock = document.createElement("div");
//     console.log(day)
//     dayBlock.className = 'forecast__item';
//     dayBlock.innerHTML = `<div class="forecast-item__heading">${name}</div>
//       <div class="forecast-item__info"><i class="wi ${applyIcon(day.weather[0].icon)}"></i> <span class="degrees">${Math.round(day.temp.day)}<i class="wi wi-degrees"></i></span></div>`;
//     FORECAST.appendChild(dayBlock);
//   });
// }
//
// // TUTORIAL reader: I moved the calling of the weather API url
// // to be able to get the current browser location
// // NOTE: check https://github.com/mdn/sprints/issues/1032#issuecomment-517447453 if you're having issues with geolocation
// if ("geolocation" in navigator) {
//   navigator.geolocation.getCurrentPosition((position) => {
//   	const coordinates = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
//     // run/render the widget data
//     getWeatherData(coordinates).then(weatherData => {
//       const city = weatherData.city;
//       const dailyForecast = weatherData.list;
//
//       renderData(city, dailyForecast);
//     });
//   }, e => console.log(e));
// } else {
// 	console.log('unable to retrieve location from browser')
// }

function searchLocation() {
    // event.preventDefault()
    var searchcity =  document.getElementById("inputlocation").value
    console.log(searchcity)
    document.getElementById("inputlocation").value="";

    //you don't need a proxy but you need secure your key in the google developer console.
    // var googleApiLink = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    // console.log(googleApiLink)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchcity}&units=metric&appid=e43f64ee98be9268f7a7f49e34aecfdf`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            // Work with JSON data here
            console.log(data)
            city = data.name;
            temp = data.main.temp;
            windspeed = data.wind.speed;
            document.getElementById("location").innerHTML = data.name;

            document.getElementById("currenttemp").innerHTML = data.main.temp;
            weather=data.weather[0].main;
            document.getElementById("wind_speed").innerHTML = data.wind.speed;
			document.getElementById("weather").innerHTML = data.weather[0].main;
			console.log(data.wind.speed, data.weather[0].icon)
            document.getElementById("currlocation").innerHTML = data.name;
			document.getElementById("temp").innerHTML = data.main.temp;


            //Set values for the location we picked the 4 object in the results becuase show the approximate address
            // document.getElementById("location").innerHTML = data.name;
        })
        .catch(err => {
            // Do something for an error here
            throw (` Error is in searc location(),  Sorry, An Error occured.  ${err}`);
        })
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
    var dsKey = "fd69f34212d5b1c69b173ff689e0dfef";

    // var googleApiKey= "";
    fetchLocation(dsKey, position.coords.latitude, position.coords.longitude)
    getWeatherData(dsKey, position.coords.latitude, position.coords.longitude)
    // searchLocation(dsKey,city)
}

function fail() {

    //You could default to your favorite city like Kernersville, NC the home of Coder Foundry!
    alert("Sorry, your browser does not support geolocation services.");
}
function speech(){
    responsiveVoice.speak(`The Temperature today in ${city} is ${temp} degree Celsius, Weather today looks ${weather} and the wind speed is ${windspeed} kilometer per hour, If you plan to go out prepare accordingly and try to avoid visiting public places, since the higher wind speed increases covid transmission risk. Have a Great Day and Stay Safe`);
}