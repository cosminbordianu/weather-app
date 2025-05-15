# Personal Portfolio

## Table of contents

- [Built with](#built-with)
- [How to run it](#how-to-run-it)
- [What I learned](#what-i-learned)

## Built with

- [OpenWeather API](https://openweathermap.org/api)
- Semantic HTML5 markup
- JavaScript
- SCSS
- netlify serverless functions
- environment variables
- CSS Flexbox
- CSS Grid
- Mobile-first workflow

## How to run it

- create an .env file in the root of the project (API_KEY='your-api-key')

- npm install (installs from package.json file the following: axios, dotenv, netlify-cli, sass)

- npx netlify dev (run local server using netlify)

## What I learned

- fetching data

```js
fetch(`/.netlify/functions/fetch-weather?lat=${lat}&lon=${lon}`)
  .then((res) => res.json())
  .then((data) => {
    const { current, forecast } = data;
    const getHTML = new generateHTML(current, forecast);
  });
```

- using environment variables

```js
const API_SECRET = process.env.API_SECRET;
```

- using serverless functions

```js
const handler = async (event) => {
  const { lat, lon } = event.queryStringParameters;
  const API_SECRET = process.env.API_SECRET;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_SECRET}`;
  const res = await axios.get(url);

  return {
    statusCode: 200,
    body: JSON.stringify(res.data),
  };
};
```
