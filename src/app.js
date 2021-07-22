const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicStaticDir = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up static directory to serve static files
app.use(express.static(publicStaticDir))

//set up handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather App',
        name: 'Lubabalo Matyila'
    })

})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About Page',
        name: 'Lubabalo Matyila'
    })

})

app.get('/help', (req, res) => {

    res.render('help', {
        message: 'Hey man this is a helper message',
        title: 'Help Page',
        name: 'Lubabalo Matyila'
    })

})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        res.send({ Error: 'There must  be a search' })
    } else {
        res.send({
            products: []

        })
    }
})




app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({ error: 'There must  be a address' })
    } else {

        const address = req.query.address

        geocode(address, (error, { latitude, longitude, location }={}) => {
            if (error) {
                return res.send(error)
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send(error)
                }

                console.log(location)
                res.send(forecastData)
            })
        })


        // res.send({
        //     forcast: 'Rainy',
        //     location: 'East London',
        //     address: req.query.address
        // })
    }

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: 'Help Page',
        name: 'Lubabalo Matyila'
    })


})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: 'Help Page',
        name: 'Lubabalo Matyila'
    })


})

app.listen(3000, () => {
    console.log('Server is up')
})