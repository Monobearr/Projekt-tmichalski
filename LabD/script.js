const API_KEY = "17e7ffd39affcd2d872ced7f620bbe73";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q={query}&appid={apiKey}&units=metric&lang=pl`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q={query}&appid={apiKey}&units=metric&lang=pl`;

class WeatherApp {
    constructor() {
        this.weatherData = [];
        this.setupEventListeners();
    }

    async getCurrentWeather() {
        const location = document.getElementById("search-input").value.trim();
        if (!location) {
            alert("Please enter a location, e.g., Warsaw, Poland");
            return;
        }
        const weatherUrl = this.createUrlWithApiKeyAndLocation(WEATHER_URL, location);
        
        try {
            const response = await fetch(weatherUrl);
            const data = await response.json();
            console.log(data);
            this.weatherData = [data]; 
            await this.getWeatherForecast(location); 
        } catch (error) {
            console.error("Error fetching current weather:", error);
        }
    }

    async getWeatherForecast(location) {
        const forecastUrl = this.createUrlWithApiKeyAndLocation(FORECAST_URL, location);

        try {
            const response = await fetch(forecastUrl);
            const { list } = await response.json();
            console.log(list);
            this.weatherData.push(...list); 
            this.displayWeather();
        } catch (error) {
            console.error("Error fetching weather forecast:", error);
        }
    }

    createUrlWithApiKeyAndLocation(url, location) {
        return url.replace("{apiKey}", API_KEY).replace("{query}", location);
    }

    displayWeather() {
        const weatherContainer = document.getElementById("results");
        weatherContainer.innerHTML = ''; 

        let previousDate = null;
        this.weatherData.forEach((item, index) => {
            const dateTime = new Date(item.dt * 1000);
            const dateOnly = dateTime.toLocaleDateString("pl-PL");

            if (previousDate !== dateOnly) {
                if (previousDate !== null) {
                    
                    const separator = document.createElement("hr");
                    separator.style.borderTop = "2px solid black";
                    weatherContainer.appendChild(separator);
                }

                previousDate = dateOnly;
                const weatherBlock = this.createWeatherBlock(
                    dateOnly,
                    item.main.temp,
                    item.main.feels_like,
                    item.weather[0].description
                );
                weatherContainer.appendChild(weatherBlock);
            }
        });
    }

    createWeatherBlock(dateText, temp, feelsLike, description) {
        const block = document.createElement("div");
        block.className = "blok-pogodowy";
        block.innerHTML = `
            <div class="weather-date"><h2>${dateText}</h2></div>
            <div class="weather-temp">Temperature: ${temp} °C</div>
            <div class="weather-feels-like">Feels like: ${feelsLike} °C</div>
            <div class="weather-description">${description}</div>
        `;
        return block;
    }

    setupEventListeners() {
        document.querySelector("#search").addEventListener("click", () => {
            this.getCurrentWeather();
        });
    }
}

document.weatherApp = new WeatherApp();
