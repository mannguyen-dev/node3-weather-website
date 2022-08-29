const request = require("postman-request");

const geocode = (address, callback) => {
    const url =
        "http://api.positionstack.com/v1/forward?access_key=0ed551a0c8e476a0e12a2cad5c39fe30&query=" +
        encodeURIComponent(address);

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unnabe to connect to location service", undefined);
        } else if (!body.data || body.data.length === 0) {
            callback("Unnable to find the location", undefined);
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label,
            });
        }
    });
};

module.exports = geocode;
