const request = require("postman-request");

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1ff04babf3710648aed5ee028ae3514a&query=${lat},${lon}&units=m`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unnabe to connect to weather service", undefined);
        } else if (body.error) {
            callback("Unnable to find the location", undefined);
        } else {
            const current = body.current;
            callback(
                undefined,
                `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`
            );
        }
    });
};

module.exports = forecast;
