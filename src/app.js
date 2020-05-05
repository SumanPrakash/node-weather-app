const express = require('express');
const path = require('path');
const hbs = require('hbs');

const getWeatherUpdate = require('./utils/weatherForecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Suman Prakash',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Suman Prakash',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is the help page',
    title: 'Help',
    name: 'Suman Prakash',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'Please provide address',
    });
  }

  getWeatherUpdate(address, (error, { location, forecast } = {}) => {
    if (error) {
      res.send({ error });
    } else {
      res.send({ location, forecast, address });
    }
  });
});

app.get('/help/*', (req, res) => {
  res.render('404page', {
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404page', {
    title: '404',
    errorMessage: '404 Page not found',
    name: 'Suman Prakash',
  });
});

app.listen(3000, () => {
  console.log('Server started at port 3000');
});
