// Global variables START
const apiKey = "c29d4cec29b559dd93b3da4906fbf049";
// Global variables END

document.querySelector("form").addEventListener("submit", function(e) {

    e.preventDefault();

    const city = document.querySelector(".weather-form .city-input").value;
    const state = document.querySelector(".weather-form .state-input").value;

    if (city != "" && state != "") {
        return getCoordinates(city, state);
    }
    console.log("Error here");

});

async function getCoordinates(city, state) {

    const coordinatesApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},840&limit=1&appid=${apiKey}`; // 840 = USA
    try {
        const response = await fetch(coordinatesApiUrl);
        const data = await response.json();

        return getWeatherData(data[0].lat, data[0].lon, data[0].name, data[0].state);
    } catch(error) {
        console.error(error);
    }
}

async function getWeatherData(latitude, longitude, city, state) {

    const weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    try {
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
        populateCurrentHighLow([data.daily[0].temp.max, data.daily[0].temp.min]);
        calculateHourlyWeather(data.hourly);
    } catch(error) {
        console.error(error);
    }
}

function populateCurrentWeather(currentTemp, currentDescription, cityName, stateName) {

    document.querySelector(".current-weather-info .location.city").innerText = cityName;
    document.querySelector(".current-weather-info .location.state").innerText = stateName;
    document.querySelector(".current-weather-info .temperature").innerText = (Math.round(parseFloat(currentTemp))).toString() + "\u00B0";
    document.querySelector(".current-weather-info .description").innerText = currentDescription;
}

function populateCurrentHighLow(highLow) {

    document.querySelector(".current-weather-info .high-low-temps .high-temp").innerText = Math.round(parseFloat(highLow[0])).toString();
    document.querySelector(".current-weather-info .high-low-temps .low-temp").innerText = Math.round(parseFloat(highLow[1])).toString();
}

async function calculateHourlyWeather(hourlyData) {

    console.log(hourlyData);

    let hourlyForecastHours = [];
    for (let i = 0; i < 11; i++) {

        try {
            const convertedTime = await convertToLocalTime(hourlyData[i].dt);
            hourlyForecastHours.push([convertedTime, hourlyData[i].temp]); // [[time, temperature], [time, temperature], ...]
        } catch(error) {
            console.error(error);
        }
    }

    console.log(hourlyForecastHours);
    populateHourlyWeather(hourlyForecastHours);
}

function populateHourlyWeather(listOfTimeTemp) {

    listOfTimeTemp.forEach((timeTemp, index) => {
        document.querySelector(`.hourly-forecast .forecast-row .forecast${index.toString()} .time-hour`).innerText = timeTemp[0];
        document.querySelector(`.hourly-forecast .forecast-row .forecast${index.toString()} .temp-hour`).innerText = Math.round(parseFloat(timeTemp[1]));
    });

    document.querySelector(`.hourly-forecast .forecast-row .forecast0 .time-hour`).innerText = "Now";
}

function convertToLocalTime(unixTimestamp) {

    const date = new Date(unixTimestamp * 1000); // Converting unixTimestamp, which is in seconds, to milliseconds
    const hours = ((date.getHours() + 11) % 12 + 1); // Converting to 12-hour format

    return hours;
}