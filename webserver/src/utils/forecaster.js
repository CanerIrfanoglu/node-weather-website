const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=eed918f20c7f86083b8bf5c9fa4d99bf&query=' + latitude + encodeURIComponent(',') + longitude + "&units=m"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (!("current" in body)) {
            callback('Unable to find weather location. Try another coordinate.', undefined)
        } else {
            callback(undefined,
                {
                    temperature: body.current.temperature,
                    feels_like: body.current.feelslike
                })
        }
    })
}


module.exports = forecast