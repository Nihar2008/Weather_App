const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");

const apiKey = "4bd541fe66689cab19129ce606995d3d";


weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value.trim();

    if (city === "") {
        displayError("Please Enter a City!");
        return;
    }

    try {

        const data = await getWeatherData(city);

        displayWeatherInfo(data);

    }

    catch (error) {

        console.error(error);

        displayError("City Not Found!");

    }

});


async function getWeatherData(city) {

    const apiUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`;

    const response = await fetch(apiUrl);

    console.log("API response status:", response.status);

    if (!response.ok) {

        const errorData = await response.json();

        console.log("API error:", errorData);

        throw new Error(errorData.message);

    }

    return await response.json();

}


function displayWeatherInfo(data) {

    console.log("Weather data received:", data);

    const cityDisplay = document.querySelector(".cityDisplay");
    const tempDisplay = document.querySelector(".tempDisplay");
    const humidityDisplay = document.querySelector(".humidityDisplay");
    const clarityDisplay = document.querySelector(".clarityDisplay");
    const weatherEmoji = document.querySelector(".weatherEmoji");
    const errorDisplay = document.querySelector(".errorDisplay");


    cityDisplay.textContent = data.name;

    tempDisplay.textContent =
        `${Math.round(data.main.temp)}°F`;

    humidityDisplay.textContent =
        `Humidity: ${data.main.humidity}%`;

    clarityDisplay.textContent =
        data.weather[0].description;

    weatherEmoji.textContent =
        getWeatherEmoji(data.weather[0].id);

    errorDisplay.textContent = "";

}


function getWeatherEmoji(weatherId) {

    if (weatherId >= 200 && weatherId < 300) {

        return "⛈️";

    }

    if (weatherId >= 300 && weatherId < 400) {

        return "🌦️";

    }

    if (weatherId >= 500 && weatherId < 600) {

        return "🌧️";

    }

    if (weatherId >= 600 && weatherId < 700) {

        return "❄️";

    }

    if (weatherId >= 700 && weatherId < 800) {

        return "🌫️";

    }

    if (weatherId === 800) {

        return "☀️";

    }

    if (weatherId > 800 && weatherId < 810) {

        return "☁️";

    }

    return "🌡️";

}


function displayError(message) {

    const errorDisplay = document.querySelector(".errorDisplay");

    errorDisplay.textContent = message;

}
