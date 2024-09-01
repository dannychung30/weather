const apiKey = "c29d4cec29b559dd93b3da4906fbf049";

document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();
});

async function getCoordinates(city, state) {
    
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},840&limit=1&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
}

async function getWeather() {

    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data);
}

// getCoordinates();
// getWeather();