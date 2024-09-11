const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// API key
const apiKey = '9575384909fa94944812a1348e7a3cdf';

// Function to calculate SMA
function calculateSMA(data, windowSize) {
    let sma = [];
    for (let i = 0; i <= data.length - windowSize; i++) {
        const window = data.slice(i, i + windowSize);
        const average = window.reduce((sum, val) => sum + val, 0) / windowSize;
        sma.push(average);
    }
    return sma;
}

// Endpoint to calculate SMA and fetch weather data for any city
app.post('/sma-and-weather', async (req, res) => {
    const data = [12, 14, 16, 18, 20, 22, 24];  // Example data for SMA calculation
    const windowSize = 3;  // Example window size for SMA
    const city = "Chennai";  
console.log(city,"city");

    try {
        // Fetch current temperature for the specified city
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=${apiKey}&units=metric
`);
        console.log(response,"response");
        const temperature = response.data.main.temp;
        const timestamp = new Date().toISOString();

        // Calculate the SMA
        const smaResult = calculateSMA(data, windowSize);

        // Respond with the SMA result and the current temperature of the specified city
        res.json({
            City: city,
            SMA: smaResult,
            Temperature: temperature,
            Timestamp: timestamp
        });
    } catch (error) {
        res.status(500).send('Error fetching weather or calculating SMA');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


