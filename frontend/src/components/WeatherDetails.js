import React from 'react';
import './WeatherDetails.css';

function WeatherDetails({ weatherData }) {
  if (!weatherData) return null;

  return (
    <div className="weather-details-card">
      <h3 className="weather-details-title">Información Adicional</h3>
      
      <div className="weather-details-grid">
        <div className="details-section">
          <h4 className="section-title">Condiciones Atmosféricas</h4>
          <div className="details-row">
            <div className="detail-item">
              <span className="detail-label">Punto de rocío</span>
              <span className="detail-value">{weatherData.current?.dewpoint_c || '--'}°C</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Nubosidad</span>
              <span className="detail-value">{weatherData.current?.cloud || '--'}%</span>
            </div>
          </div>
          <div className="details-row">
            <div className="detail-item">
              <span className="detail-label">Ráfagas de viento</span>
              <span className="detail-value">{weatherData.current?.gust_kph || '--'} km/h</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Índice de calor</span>
              <span className="detail-value">{weatherData.current?.heatindex_c || '--'}°C</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h4 className="section-title">Información de Ubicación</h4>
          <div className="details-row">
            <div className="detail-item">
              <span className="detail-label">Región</span>
              <span className="detail-value">{weatherData.location?.region || '--'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">País</span>
              <span className="detail-value">{weatherData.location?.country || '--'}</span>
            </div>
          </div>
          <div className="details-row">
            <div className="detail-item">
              <span className="detail-label">Zona horaria</span>
              <span className="detail-value">{weatherData.location?.tz_id || '--'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Última actualización</span>
              <span className="detail-value">{new Date(weatherData.current?.last_updated || '').toLocaleString('es-ES')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails; 