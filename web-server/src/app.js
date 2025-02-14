const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and set views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static dir 
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Florian',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Florian',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'You can do it!',
        title: 'Help',
        name: 'Florian'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error });

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) return res.send({ error });

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404-Help',
        name: 'Florian',
        errorMessage: 'Sorry there is no help article for this'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Florian',
        errorMessage: 'Sorry this page doesn\'t exist'
    });
});

app.listen(port, () => {
    console.log(`Sever starting on port ${port}`)
});