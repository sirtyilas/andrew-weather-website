const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url =  `http://api.weatherstack.com/current?access_key=b7375d667c53b8930501c3ff6e171f90&query=${latitude},-${longitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = forecast