export default class generateHTML {
    constructor(currentWeather, forecastWeather) {
        this.currentWeather = currentWeather;
        this.forecastWeather = forecastWeather;

        console.log("currentWeather: ", currentWeather);
        console.log("forecastWeather: ", forecastWeather);
        this.generateHTMLForCurrentWeather(currentWeather);
        this.generateHTMLForForecastWeather(forecastWeather.list);
    }
    
    generateHTMLForCurrentWeather(currentWeather) {
        const weatherSection = document.querySelector('.weather');
        weatherSection.classList.remove('intro')
        weatherSection.innerHTML = ``;

        weatherSection.innerHTML = `<div class="weather__card">
          <p>Now</p>
          <div class="weather__card-stats flex">
            <h1>${parseInt(currentWeather.main.temp).toFixed(0)} &deg;C</h1>
            <img
              src="./assets/images/${currentWeather.weather[0].icon}.png"
              alt="weather icon"
              class="big-icon"
            />
          </div>
          <p>${currentWeather.weather[0].main}</p>
          <hr />
          <div class="flex">
            <img
              src="./assets/images/location-white.svg"
              alt="location icon"
              class="small-icon"
            />
            <p class="gray-text">${new Date().toLocaleDateString('en-US', { weekday: 'long' })} ${new Date().getDate()}, ${new Date().toLocaleDateString('en-US', { month: 'long' })}</p>
          </div>
          <div class="flex">
            <img
              src="./assets/images/location-white.svg"
              alt=""
              class="small-icon"
            />
            <p class="gray-text">${currentWeather.name}, ${currentWeather.sys.country}</p>
          </div>
        </div>
        <div class="weather__card-stats">
          <div class="weather__card-highlight">
            <h2>${parseInt(currentWeather.main.feels_like).toFixed(0)} &deg;C</h2>
            <p class="gray-text">Feels like</p>
          </div>
          <div class="weather__card-highlight">
            <h2>${currentWeather.main.humidity}%</h2>
            <p class="gray-text">Humidity</p>
          </div>
          <div class="weather__card-highlight">
            <h2>${parseInt(currentWeather.visibility)/1000}km</h2>
            <p class="gray-text">Visibility</p>
          </div>
          <div class="weather__card-highlight">
            <h2>${currentWeather.main.pressure}hPa</h2>
            <p class="gray-text">Pressure</p>
          </div>
        </div>`
    }

    generateHTMLForForecastWeather(forecastWeather) {
     const forecastSection = document.querySelector('.forecast');
     const forecastTitle = document.querySelector('.forecast-title');
     forecastTitle.classList.remove('invisible');

     forecastSection.innerHTML = ``;

      const fiveDaysForecast = forecastWeather.filter(f => new Date(f.dt*1000).getUTCHours() === 12)
                                              .filter(f => new Date(f.dt*1000).toDateString() !== new Date().toDateString())
                                              .slice(0, 5)

      fiveDaysForecast.map(f => {
      
        const date = new Date(f.dt * 1000);
        const formattedDate = date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric'
        })
        
        forecastSection.innerHTML += `
          <div class="forecast__card">
            <p>${formattedDate}</p>
            <img src="./assets/images/${f.weather[0].icon}.png" alt="" />
            <h3>${parseInt(f.main.temp).toFixed(0)} &deg;C</h3>
          </div>
        `;

      })
      
    }
}