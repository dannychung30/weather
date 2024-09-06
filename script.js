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

    return getWeatherData(data[0].lat, data[0].lon, data[0].name, data[0].state);
}

async function getWeatherData(latitude, longitude, city, state) {

    const weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    const response = await fetch(weatherApiUrl);
    const data = await response.json();

    console.log(data);
    console.log(data.hourly[0]);
    console.log(data.hourly[1]);
    console.log(data.hourly[2]);
    console.log(data.hourly[3]);
    console.log(data.hourly[4]);
    console.log(data.hourly[5]);
    console.log(data.hourly[6]);

    populateCurrentWeather(data.current.temp, data.current.weather[0].main, city, state);
    convertToLocalTime().then({
        function(times) {
            populateHourlyWeather();
        }
    });
}

function populateCurrentWeather(currentTemp, currentDescription, cityName, stateName) {
    document.querySelector(".current-weather-info .location.city").innerText = cityName;
    document.querySelector(".current-weather-info .location.state").innerText = stateName;
    document.querySelector(".current-weather-info .temperature").innerText = (Math.round(parseFloat(currentTemp))).toString() + "\u00B0";
    document.querySelector(".current-weather-info .description").innerText = currentDescription;
}

function populateHourlyWeather() {
    
}

async function convertToLocalTime(unixTimestamp) {

}