const Exposure = require('../models/Exposure');
const mongoose = require('mongoose');
const axios = require('axios');

// Función para obtener datos del clima y calcular UV
const getWeatherData = async (location, date) => {
  try {
    const weatherApiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${encodeURIComponent(location)}&days=1&aqi=no`);
    
    const forecastDay = response.data.forecast.forecastday[0];
    const hourlyData = forecastDay.hour;
    
    // Calcular UV promedio del día
    let totalUV = 0;
    let uvCount = 0;
    
    hourlyData.forEach(hour => {
      if (hour.uv > 0) {
        totalUV += hour.uv;
        uvCount++;
      }
    });
    
    const averageUV = uvCount > 0 ? totalUV / uvCount : 0;
    return averageUV;
  } catch (error) {
    console.error('Error getting weather data:', error);
    return 0;
  }
};

exports.getExposures = async (req, res) => {
  try {
    const { userId } = req.query;
    const exposures = await Exposure.find({ userId }).sort({ date: -1 });
    res.json(exposures);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener exposiciones', error: err.message });
  }
};

exports.createExposure = async (req, res) => {
  try {
    const { userId, date, intervals, location, minutesExposed } = req.body;
    
    console.log('Fecha recibida:', date); // Debug
    
    // Calcular UV automáticamente basándose en la ubicación y fecha
    const uvEstimated = await getWeatherData(location, date);
    
    // Corregir el problema de zona horaria
    // La fecha viene en formato YYYY-MM-DD, necesitamos crear la fecha correctamente
    const [year, month, day] = date.split('-').map(Number);
    const exposureDate = new Date(year, month - 1, day); // month - 1 porque los meses van de 0-11
    
    console.log('Fecha procesada:', exposureDate); // Debug
    console.log('Fecha ISO:', exposureDate.toISOString()); // Debug
    
    const exposure = new Exposure({ 
      userId, 
      date: exposureDate, 
      intervals, 
      location, 
      uvEstimated: Math.round(uvEstimated * 100) / 100, // Redondear a 2 decimales
      minutesExposed 
    });
    
    await exposure.save();
    res.status(201).json({ message: 'Exposición registrada', exposure });
  } catch (err) {
    console.error('Error creating exposure:', err);
    res.status(500).json({ message: 'Error al registrar exposición', error: err.message });
  }
};

exports.getTodayExposure = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log('getTodayExposure called for userId:', userId);
    
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    
    const exposure = await Exposure.findOne({
      userId,
      date: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });
    
    console.log('Exposure found:', exposure);
    res.json(exposure);
  } catch (err) {
    console.error('Error in getTodayExposure:', err);
    res.status(500).json({ message: 'Error al obtener exposición de hoy', error: err.message });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const { userId } = req.query;
    // Usar UTC para evitar desfases de zona horaria
    const now = new Date();
    const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const last7UTC = new Date(todayUTC);
    last7UTC.setUTCDate(todayUTC.getUTCDate() - 6);

    const summary = await Exposure.aggregate([
      { 
        $match: { 
          userId: new mongoose.Types.ObjectId(userId), 
          date: { $gte: last7UTC } 
        } 
      },
      { 
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date', timezone: 'UTC' } },
          totalMinutes: { $sum: '$minutesExposed' },
          totalUV: { $sum: '$uvEstimated' }
        } 
      },
      { $sort: { '_id': 1 } }
    ]);

    // Generar los últimos 7 días en UTC
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(todayUTC);
      date.setUTCDate(todayUTC.getUTCDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const existingDay = summary.find(day => day._id === dateStr);
      last7Days.push({
        _id: dateStr,
        totalMinutes: existingDay ? existingDay.totalMinutes : 0,
        totalUV: existingDay ? existingDay.totalUV : 0
      });
    }

    res.json(last7Days);
  } catch (err) {
    console.error('Error in getSummary:', err);
    res.status(500).json({ message: 'Error al obtener resumen', error: err.message });
  }
};

exports.deleteExposure = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    
    const exposure = await Exposure.findOneAndDelete({ 
      _id: id, 
      userId: new mongoose.Types.ObjectId(userId) 
    });
    
    if (!exposure) {
      return res.status(404).json({ message: 'Exposición no encontrada' });
    }
    
    res.json({ message: 'Exposición eliminada correctamente' });
  } catch (err) {
    console.error('Error deleting exposure:', err);
    res.status(500).json({ message: 'Error al eliminar exposición', error: err.message });
  }
}; 