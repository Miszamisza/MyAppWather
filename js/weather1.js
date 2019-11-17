let input = document.getElementById("input");
let iconw = document.getElementById("icon");
let temp = document.getElementById("temp");
let pressure = document.getElementById("tempDesc");
const APIKEY = `621ade6f9cf22647cbe0dc0e15904a9c`;
const weather = {};
weather.temp = {
    unit: "kelvin"
};

input.addEventListener('submit', cityChoose);

function cityChoose(e) {
    e.preventDefault();
    let city = document.getElementById("text").value;
    getWeather(city);
}

function getWeather(city) {
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temp.value = data.main.temp;
            weather.icon = data.weather[0].icon;
            weather.description = data.main.pressure;
            weather.city = data.name;
        })
        .then(function () {
            updateWeather();
        })
}

function updateWeather() {
    temp.innerHTML = `${weather.temp.value}`;
    iconw.innerHTML = `${weather.icon}K`;
    pressure.innerHTML = `${weather.description}`;
}