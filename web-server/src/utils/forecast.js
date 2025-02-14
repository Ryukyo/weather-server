const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b710bd0cfeec089581a49de4fe12b75c&query=${latitude},${longitude}`;
    
    
    request({ url, json : true}, (error, {body}) => {
        if (error) callback('Unable to connect to weather service', undefined);
        else if (body.error) callback('Unable to connect to weather service', undefined);
        else callback(undefined, `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degrees and it feels like ${body.current.feelslike} degrees outside.
         The humidity is ${body.current.humidity} %.`);
    });
}

module.exports = forecast;