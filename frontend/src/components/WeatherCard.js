import React from 'react';
import './WeatherCard.css';

function WeatherCard({ city, temperature, uvIndex, uvLevel, weatherData }) {
  // Función para obtener el icono del clima
  const getWeatherIcon = (condition) => {
    if (!condition) return '☀️';
    const text = condition.toLowerCase();
    if (text.includes('lluvia') || text.includes('rain')) return '🌧️';
    if (text.includes('nieve') || text.includes('snow')) return '❄️';
    if (text.includes('nube') || text.includes('cloud')) return '☁️';
    if (text.includes('tormenta') || text.includes('storm')) return '⛈️';
    if (text.includes('niebla') || text.includes('fog')) return '🌫️';
    return '☀️';
  };

  // Función para obtener la dirección del viento
  const getWindDirection = (degree) => {
    if (!degree) return '--';
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degree / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <span className="weather-city">{city}</span>
        <span className="weather-icon" role="img" aria-label="weather">
          {getWeatherIcon(weatherData?.current?.condition?.text)}
        </span>
      </div>
      
      <div className="weather-main">
        <div className="weather-temp">{temperature}°C</div>
        <div className="weather-condition">{weatherData?.current?.condition?.text || 'Despejado'}</div>
      </div>

      <div className="weather-details">
        <div className="weather-row">
          <div className="weather-item">
            <span className="weather-label">Sensación térmica</span>
            <span className="weather-value">{weatherData?.current?.feelslike_c || '--'}°C</span>
          </div>
          <div className="weather-item">
            <span className="weather-label">Humedad</span>
            <span className="weather-value">{weatherData?.current?.humidity || '--'}%</span>
          </div>
        </div>

        <div className="weather-row">
          <div className="weather-item">
            <span className="weather-label">Viento</span>
            <span className="weather-value">
              {weatherData?.current?.wind_kph || '--'} km/h {getWindDirection(weatherData?.current?.wind_degree)}
            </span>
          </div>
          <div className="weather-item">
            <span className="weather-label">Presión</span>
            <span className="weather-value">{weatherData?.current?.pressure_mb || '--'} mb</span>
          </div>
        </div>

        <div className="weather-row">
          <div className="weather-item">
            <span className="weather-label">Precipitación</span>
            <span className="weather-value">{weatherData?.current?.precip_mm || '0'} mm</span>
          </div>
          <div className="weather-item">
            <span className="weather-label">Visibilidad</span>
            <span className="weather-value">{weatherData?.current?.vis_km || '--'} km</span>
          </div>
        </div>

        <div className="weather-row">
          <div className="weather-item">
            <span className="weather-label">Índice UV</span>
            <span className="weather-value uv-badge">{uvIndex}</span>
          </div>
          <div className="weather-item">
            <span className="weather-label">Nivel UV</span>
            <span className="weather-value">{uvLevel}</span>
          </div>
        </div>

        {weatherData?.forecast?.forecastday?.[0] && (
          <div className="weather-forecast">
            <div className="weather-row">
              <div className="weather-item">
                <span className="weather-label">Prob. lluvia</span>
                <span className="weather-value">{weatherData.forecast.forecastday[0].day.daily_chance_of_rain || '0'}%</span>
              </div>
              <div className="weather-item">
                <span className="weather-label">Máx/Mín</span>
                <span className="weather-value">
                  {weatherData.forecast.forecastday[0].day.maxtemp_c || '--'}° / {weatherData.forecast.forecastday[0].day.mintemp_c || '--'}°
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherCard; 