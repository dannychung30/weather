// Get global variables
const apiKey = "c29d4cec29b559dd93b3da4906fbf049";

document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    const city = document.querySelector(".weather-form .city-input").value;
    const state = document.querySelector(".weather-form .state-input").value;

    if (city != "" && state != "") {
        return getCoordinates(city, state);
    }

    console.log("Error");

});

async function getCoordinates(city, state) {

    const coordinatesApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},840&limit=1&appid=${apiKey}`;
    const response = await fetch(coordinatesApiUrl);
    const data = await response.json();

    return getWeather(data[0].lat, data[0].lon, data[0].name, data[0].state);
}

async function getWeather(latitude, longitude, city, state) {

    const weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    const response = await fetch(weatherApiUrl);
    const data = await response.json();

    return populateCurrentWeather(data.current.temp, data.current.weather[0].main, city, state);
}

function populateCurrentWeather(currentTemp, currentDescription, cityName, stateName) {
    document.querySelector(".current-weather-info .location.city").innerText = cityName;
    document.querySelector(".current-weather-info .location.state").innerText = stateName;
    document.querySelector(".current-weather-info .temperature").innerText = `${currentTemp}\u00B0`;
    document.querySelector(".current-weather-info .description").innerText = currentDescription;
}