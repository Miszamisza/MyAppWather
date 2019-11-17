let city = document.getElementById("city");
let iconw = document.getElementById("icon");
let temp = document.getElementById("temp");
let pressure = document.getElementById("tempDesc");
let country = document.getElementById("country");
let wind = document.getElementById("wind");
let input = document.getElementById("input");

const APIKEY = `621ade6f9cf22647cbe0dc0e15904a9c`;
const weather = {};
weather.temp = {
    unit: "kelvin"
};

input.addEventListener('submit', cityChoose);

function cityChoose(e) {
    e.preventDefault();
    let city = document.getElementById("text").value;
    getWeatherByCity(city);
}

//check location
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    error.style.display = "block";
    error.message = `<p>Something go wrong</p>`
}

//user position
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeatherByLocation(latitude, longitude);
}

//get weather by city
function getWeatherByCity(city) {
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temp.value = Math.floor((data.main.temp - 273.15));
            weather.icon = data.weather[0].icon;
            weather.description = data.main.pressure;
            weather.city = data.name;
            weather.wind = data.wind.speed;
            weather.country = data.sys.country;
        })
        .then(function () {
            updateWeather();
        })
}

//get weather by localization
function getWeatherByLocation(lat, lon) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`;
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            weather.temp.value = Math.floor((data.main.temp - 273.15));
            weather.icon = data.weather[0].icon;
            weather.description = data.main.pressure;
            weather.city = data.name;
            weather.wind = data.wind.speed;
            weather.country = data.sys.country;
        })
        .then(function () {
            updateWeather();
        })
}

//Utilities
function updateWeather() {
    city.innerHTML = `${weather.city}`
    temp.innerHTML = `<span>Temperatura: </span>${weather.temp.value}<span>&deg C</span>`;
    iconw.innerHTML = `${weather.icon}`;
    pressure.innerHTML = `<span>Ciśnienie: </span>${weather.description} <span> hPa</span>`;
    wind.innerHTML = `<span>Wiatr: </span>${weather.wind} m/s`;
    country.innerHTML = `${weather.country}`
}


function showError(error) {
    pressure.style.display = "block";
    pressure.message.innerHTML = `<p>${error.message}</p>`
}

