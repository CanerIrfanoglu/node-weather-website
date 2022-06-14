const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecaster')
const geocode = require('./utils/geocode')



const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setting up handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    // render views 
    res.render('index', {
        title: 'Weather App',
        name: 'Caner'
    })
})


app.get('/about', (req, res) => {
    // render views 
    res.render('about', {
        title: 'About Page Title',
    })
})

app.get('/help', (req, res) => {
    // render views 
    res.render('help', {
        title: 'Help Page Title',
    })
})




app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (err, { location, longitude, latitude } = {}) => {
        if (err) {
            return res.send({ error: 'Alarm Bebeksiligi. ' + err })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error: error })
            }
            res.send([{
                forecast: forecastData,
                location: location,
                address: req.query.address
            },
            ])
        })
    })




})


app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }



    res.send({
        products: []
    })

})



app.get('/help/*', (req, res) => {
    // 404 Help
    res.render('help404', {
        errorMessageHelp: 'Help Page not Found!'
    })
})


app.get('*', (req, res) => {
    // 404

    res.render('404', {
        errorMessage: "Page not Found!"
    })
})




app.listen(3000, () => {
    console.log("Server is running on port 3000...")
})