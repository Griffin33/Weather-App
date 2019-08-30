if (process.env.Node_ENV !== 'production') {
    require('dotenv').config()
}

const METEOSERVER_API_KEY = process.env.METEOSERVER_API_KEY
const axios = require('axios')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/weather', (req, res) => {
    const url = `https://meteoserver.nl/api/liveweer.php?locatie=${req.body.place}&key=7e81dcd680?units=auto`
    axios({
        url: url,
        responseType: 'json'
    }).then(data => res.json(data.data.currently))
})

app.listen(3000, () => {
    console.log('Server is up and running!')
})