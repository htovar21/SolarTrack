import React from 'react';
import './HourlyForecast.css';

function HourlyForecast({ hourlyData }) {
  if (!hourlyData || hourlyData.length === 0) {
    return null;
  }

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

  const formatHour = (time) => {
    return new Date(time).toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  // Mostrar las 24 horas completas
  const displayHours = hourlyData.slice(0, 24);

  return (
    <div className="hourly-forecast-card">
      <h3 className="hourly-forecast-title">Pronóstico por Horas (24h)</h3>
      <div className="hourly-forecast-container">
        {displayHours.map((hour, index) => (
          <div key={index} className="hourly-item">
            <div className="hourly-time">{formatHour(hour.time)}</div>
            <div className="hourly-icon" role="img" aria-label="weather">
              {getWeatherIcon(hour.condition?.text)}
            </div>
            <div className="hourly-temp">{hour.temp_c}°</div>
            <div className="hourly-uv">{hour.uv}</div>
            <div className="hourly-precip">{hour.chance_of_rain}%</div>
          </div>
        ))}
      </div>
      <div className="hourly-legend">
        <div className="legend-item">
          <span className="legend-label uv-legend-label">UV:</span>
          <span className="legend-value uv-legend-value">Índice UV</span>
        </div>
        <div className="legend-item">
          <span className="legend-label rain-legend-label">Lluvia:</span>
          <span className="legend-value rain-legend-value">Probabilidad</span>
        </div>
      </div>
    </div>
  );
}

export default HourlyForecast; 