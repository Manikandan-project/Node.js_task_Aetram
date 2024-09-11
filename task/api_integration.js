const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

//  API key
const apiKey = '9575384909fa94944812a1348e7a3cdf';


// Endpoint to fetch weather data for a given city
app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching weather data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

