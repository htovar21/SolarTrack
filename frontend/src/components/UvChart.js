import React, { useEffect, useState } from 'react';
import { getSummary } from '../services/api';
import './UvChart.css';

function UvChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUVData();
  }, []);

  const loadUVData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      
      if (!user || !token) {
        setError('No hay usuario autenticado.');
        setLoading(false);
        return;
      }

      const response = await getSummary(user.id, token);
      console.log('UV Chart data:', response); // Debug
      
      if (Array.isArray(response)) {
        setData(response);
      } else {
        console.error('Invalid response format:', response);
        setError('Formato de datos inválido.');
      }
    } catch (err) {
      console.error('Error getting UV summary:', err);
      setError('Error al obtener resumen UV.');
    } finally {
      setLoading(false);
    }
  };

  // Función para formatear la fecha de forma robusta y clara
  const WEEKDAYS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      const day = date.getUTCDate();
      const weekday = WEEKDAYS[date.getUTCDay()];
      return `${weekday} ${day}`;
    } catch (error) {
      return dateStr;
    }
  };

  // Función para obtener el color del bar basado en el UV
  const getBarColor = (uv) => {
    if (uv >= 20) return '#e53e3e'; // Alto - Rojo
    if (uv >= 10) return '#d69e2e'; // Medio - Amarillo
    if (uv > 0) return '#38a169';   // Bajo - Verde
    return '#e2e8f0';               // Sin datos - Gris
  };

  // Función para obtener el nivel de riesgo
  const getRiskLevel = (uv) => {
    if (uv >= 20) return 'Alto';
    if (uv >= 10) return 'Medio';
    if (uv > 0) return 'Bajo';
    return 'Sin datos';
  };

  if (loading) {
    return (
      <div className="uv-chart-card">
        <span className="uv-chart-title">UV por Día (Últimos 7 Días)</span>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando datos de UV...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="uv-chart-card">
        <span className="uv-chart-title">UV por Día (Últimos 7 Días)</span>
        <div className="error-container">
          <p>⚠️ {error}</p>
          <button onClick={loadUVData} className="retry-btn">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Calcular el máximo UV para escalar las barras
  const maxUv = data.length > 0 ? Math.max(...data.map(d => d.totalUV || 0)) : 1;
  const hasData = data.some(d => d.totalUV > 0);

  return (
    <div className="uv-chart-card">
      <span className="uv-chart-title">UV por Día (Últimos 7 Días)</span>
      
      {!hasData ? (
        <div className="no-data-message">
          <p>📊 No hay datos de UV registrados en los últimos 7 días.</p>
          <p>Registra tu primera exposición solar para ver el gráfico.</p>
        </div>
      ) : (
        <>
          <div className="uv-chart-bars">
            {data.map((d, i) => (
              <div className="uv-bar-group" key={i}>
                <div
                  className="uv-bar"
                  style={{ 
                    height: `${((d.totalUV || 0) / maxUv) * 120 + 30}px`,
                    backgroundColor: getBarColor(d.totalUV || 0)
                  }}
                  title={`${formatDate(d._id)}: ${(d.totalUV || 0).toFixed(1)} UV (${getRiskLevel(d.totalUV || 0)})`}
                >
                  <span className="uv-bar-value">
                    {(d.totalUV || 0).toFixed(1)}
                  </span>
                </div>
                <span className="uv-bar-date">{formatDate(d._id)}</span>
              </div>
            ))}
          </div>
          
          {/* Leyenda */}
          <div className="uv-legend">
            <div className="legend-item">
              <span className="legend-color" style={{backgroundColor: '#38a169'}}></span>
              <span>Bajo (0-9.9)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{backgroundColor: '#d69e2e'}}></span>
              <span>Medio (10-19.9)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{backgroundColor: '#e53e3e'}}></span>
              <span>Alto (20+)</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UvChart; 