// Get global variables
const apiKey = "c29d4cec29b559dd93b3da4906fbf049";

document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    const city = document.querySelector(".weather-form .city-input").value;
    const state = document.querySelector(".weather-form .state-input").value;

    getCoordinates(city, state);

});

async function getCoordinates(city, state) {

    const coordinatesApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},840&limit=1&appid=${apiKey}`;
    const response = await fetch(coordinatesApiUrl);
    const data = await response.json();

    getWeather(data[0].lat, data[0].lon);
}

async function getWeather(latitude, longitude) {

    const weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    const response = await fetch(weatherApiUrl);
    const data = await response.json();

    console.log(data.current);
}