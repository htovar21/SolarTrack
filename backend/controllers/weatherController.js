const axios = require('axios');

exports.getWeather = async (req, res) => {
  try {
    const { location } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;
    
    // Obtener datos actuales y pronóstico de 3 días
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=3&aqi=no`;
    const response = await axios.get(url);
    
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener clima', error: err.message });
  }
}; 