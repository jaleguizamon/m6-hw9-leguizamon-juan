const key = '4d5fe15463f8f9b69807c76e7a411130';
const noResultMessage = [
    "Location not found",
    "Incorrect location",
];

var button = document.querySelector('button');
var inputElement = document.getElementById('city');
var returnObj = document.querySelector('.returnObject');
var city = document.querySelector('.city');
var locLink = document.querySelector('.locLink');
var icon = document.querySelector('.icon');
var description = document.querySelector('.description');
var currentTemp = document.querySelector('.current');
var feelsLikeTemp = document.querySelector('.feels');

var tof = 0;

button.onclick = function() {
    if(tof == 0){
        tof = 1;
    }else {
        tof = 0;
    }

    var inputQuery = inputElement.value.trim();
    var noSpaceQuery = inputQuery.split(' ').join('');
    fetch('https://api.openweathermap.org/geo/1.0/direct?q='+noSpaceQuery+',US&limit=3&appid='+key) // make the request
    .then(function(res) {
        return res.json();
    })
    .then(function(res) {
        pullLatLong(res);
    })
}

function pullLatLong(locationObj) {
    if(locationObj.length === 0){
        clearHTML();
        city.textContent = noResultMessage[tof];
        return;
    }
    var lat = locationObj[0].lat;
    var long = locationObj[0].lon;
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid='+key+'&units=imperial') // make the request
    .then(function(res) {
        return res.json();
    })
    .then(function(res) {
        displayWeather(res);
    })
}

function displayWeather(weatherObj) {
    returnObj.style.background = 'rgba(186, 161, 161, 0.25)';
    city.textContent = weatherObj.name + ', ' + weatherObj.sys.country;
    locLink.innerHTML = '<a href="https://google.com/maps/place/'+weatherObj.name+',+'+weatherObj.sys.country+'" target="_blank">Click to view map</a>';
    icon.innerHTML = '<img src="https://openweathermap.org/img/wn/'+weatherObj.weather[0].icon+'@2x.png"></img>';
    description.textContent = weatherObj.weather[0].description;
    currentTemp.textContent = 'Current: ' + weatherObj.main.temp + ' \xB0F';
    feelsLikeTemp.textContent = 'Feels Like: ' + weatherObj.main.feels_like + ' \xB0F';
}

function clearHTML() {
    returnObj.style.background = '';
    city.textContent = '';
    locLink.innerHTML = '';
    icon.innerHTML = '';
    description.innerHTML = '';
    currentTemp.textContent = '';
    feelsLikeTemp.textContent = '';
}