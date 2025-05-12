
  // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_SECRET}`;
  // const geocoding = `http://api.openweathermap.org/geo/1.0/direct?q=london&limit=5&appid=${API_SECRET}`;

const axios = require("axios");

const handler = async (event) => {
  const { city, lat, lon } = event.queryStringParameters;

  const API_SECRET = process.env.API_SECRET;

  if (city) {
    const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_SECRET}`;

    try {
    const geoRes = await axios.get(geocodingUrl);

    return {
      statusCode: 200,
      body: JSON.stringify(geoRes.data),
    };
  } catch (error) {
    const { status, statusText, headers, data } = error.response;
    return {
      statusCode: status,
      body: JSON.stringify({ status, statusText, headers, data }),
    };
  }
  }

  if (lat && lon) {
    try {
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_SECRET}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_SECRET}`;

      const [currentWeatherRes, forecastRes] = await Promise.all([
        axios.get(currentWeatherUrl),
        axios.get(forecastUrl),
      ]);

      return {
        statusCode: 200,
        body: JSON.stringify({
          current: currentWeatherRes.data,
          forecast: forecastRes.data,
        })
      }

    } catch (error) {
      const { status, statusText, headers, data } = error.response;
    return {
      statusCode: status,
      body: JSON.stringify({ status, statusText, headers, data }),
     };
    }
  }


  return {
    statusCode: 400,
    body: JSON.stringify({ error: "Missing 'city' or 'lat' and 'lon' query parameters." }),
  };

};

module.exports = { handler };
