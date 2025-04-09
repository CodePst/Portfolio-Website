const apiKey = "f7d833435e1022ef5b481933126ec3f8";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

function fetchWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                document.getElementById("weatherInfo").innerHTML = `<p style="color: red;">${data.message}</p>`;
                return;
            }
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("weatherInfo").innerHTML = `<p style="color: red;">Error fetching data.</p>`;
        });
}

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.cod !== 200) {
                        document.getElementById("weatherInfo").innerHTML = `<p style="color: red;">${data.message}</p>`;
                        return;
                    }
                    displayWeather(data);
                })
                .catch(error => {
                    console.error("Error:", error);
                    document.getElementById("weatherInfo").innerHTML = `<p style="color: red;">Error fetching data.</p>`;
                });
        }, () => {
            document.getElementById("weatherInfo").innerHTML = `<p style="color: red;">Location access denied.</p>`;
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

function displayWeather(data) {
    const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡 Temperature: <b>${data.main.temp}°C</b></p>
        <p>☁ Condition: <b>${data.weather[0].description}</b></p>
        <p>💧 Humidity: <b>${data.main.humidity}%</b></p>
        <p>🌬 Wind Speed: <b>${data.wind.speed} m/s</b></p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
    `;
    document.getElementById("weatherInfo").innerHTML = weatherHTML;
}
