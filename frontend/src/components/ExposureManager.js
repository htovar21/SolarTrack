import React, { useState, useEffect } from 'react';
import { createExposure, getExposures, deleteExposure } from '../services/api';
import './ExposureManager.css';

function ExposureManager() {
  const [exposures, setExposures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userLocation, setUserLocation] = useState('');
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    intervals: [{ start: '', end: '' }]
  });

  useEffect(() => {
    loadExposures();
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          setUserLocation('Ubicación no disponible');
        }
      );
    } else {
      setUserLocation('Geolocalización no soportada');
    }
  };

  const loadExposures = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      
      if (!user || !token) {
        setError('No hay usuario autenticado.');
        setLoading(false);
        return;
      }

      const exposuresData = await getExposures(user.id, token);
      setExposures(exposuresData);
    } catch (err) {
      setError('Error al cargar exposiciones.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExposure = async (exposureId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta exposición?')) {
      return;
    }

    try {
      setDeleting(exposureId);
      setError('');
      setSuccess('');

      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      if (!user || !token) {
        setError('No hay usuario autenticado.');
        return;
      }

      await deleteExposure(exposureId, token);
      setSuccess('Exposición eliminada correctamente.');
      
      // Recargar datos para actualizar el historial y el resumen de hoy
      await loadExposures();
    } catch (err) {
      setError('Error al eliminar exposición.');
    } finally {
      setDeleting(null);
    }
  };

  // Función para obtener el resumen de exposiciones de hoy
  const getTodayExposuresSummary = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayExposures = exposures.filter(exposure => 
      exposure.date.split('T')[0] === today
    );
    
    if (todayExposures.length === 0) return null;
    
    const totalMinutes = todayExposures.reduce((sum, exp) => sum + exp.minutesExposed, 0);
    const totalUV = todayExposures.reduce((sum, exp) => sum + exp.uvEstimated, 0);
    const locations = [...new Set(todayExposures.map(exp => exp.location))];
    
    return {
      totalMinutes,
      totalUV,
      location: locations.join(', '),
      count: todayExposures.length
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIntervalChange = (index, field, value) => {
    const newIntervals = [...formData.intervals];
    newIntervals[index][field] = value;
    setFormData(prev => ({
      ...prev,
      intervals: newIntervals
    }));
  };

  const addInterval = () => {
    setFormData(prev => ({
      ...prev,
      intervals: [...prev.intervals, { start: '', end: '' }]
    }));
  };

  const removeInterval = (index) => {
    if (formData.intervals.length > 1) {
      const newIntervals = formData.intervals.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        intervals: newIntervals
      }));
    }
  };

  // Función para calcular minutos totales de exposición
  const calculateTotalMinutes = (intervals) => {
    return intervals.reduce((total, interval) => {
      if (interval.start && interval.end) {
        const startTime = new Date(`2000-01-01T${interval.start}`);
        const endTime = new Date(`2000-01-01T${interval.end}`);
        const diffMs = endTime - startTime;
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return total + Math.max(0, diffMinutes);
      }
      return total;
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError('');
      setSuccess('');

      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      if (!user || !token) {
        setError('No hay usuario autenticado.');
        return;
      }

      // Validar datos
      if (!formData.intervals.every(interval => interval.start && interval.end)) {
        setError('Todos los intervalos deben tener hora de inicio y fin.');
        return;
      }

      // Calcular minutos totales automáticamente
      const minutesExposed = calculateTotalMinutes(formData.intervals);

      if (minutesExposed <= 0) {
        setError('Los intervalos de tiempo no son válidos.');
        return;
      }

      const exposureData = {
        userId: user.id,
        date: formData.date,
        location: userLocation,
        intervals: formData.intervals,
        minutesExposed: minutesExposed,
        uvEstimated: 0 // Se calculará automáticamente en el backend basándose en la ubicación y fecha
      };

      await createExposure(exposureData, token);
      
      setSuccess('Exposición registrada correctamente.');
      setFormData({
        date: new Date().toISOString().split('T')[0],
        intervals: [{ start: '', end: '' }]
      });
      
      // Recargar datos
      await loadExposures();
    } catch (err) {
      setError('Error al registrar exposición.');
    } finally {
      setSubmitting(false);
    }
  };

  const calculateRisk = (uv) => {
    if (uv >= 20) return { level: 'Alto', color: '#e53e3e' };
    if (uv >= 10) return { level: 'Medio', color: '#d69e2e' };
    return { level: 'Bajo', color: '#38a169' };
  };

  if (loading) return <div className="loading-container">Cargando exposiciones...</div>;

  // Obtener resumen de exposiciones de hoy
  const todaySummary = getTodayExposuresSummary();

  return (
    <div className="exposure-manager">
      <div className="exposure-header">
        <h2 className="exposure-title">Gestión de Exposiciones Solares</h2>
        <p className="exposure-subtitle">Registra y consulta tu historial de exposición al sol</p>
      </div>

      <div className="exposure-grid">
        {/* Panel izquierdo - Registro de exposición */}
        <div className="exposure-left-panel">
          <div className="register-card">
            <h3 className="register-title">Registrar Nueva Exposición</h3>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <form onSubmit={handleSubmit} className="exposure-form">
              <div className="form-group">
                <label htmlFor="date">Fecha</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Ubicación</label>
                <div className="location-display">
                  <span className="location-text">{userLocation}</span>
                  <button 
                    type="button" 
                    onClick={getUserLocation}
                    className="refresh-location-btn"
                    title="Actualizar ubicación"
                  >
                    🔄
                  </button>
                </div>
                <p className="form-help-text">Ubicación detectada automáticamente desde tu dispositivo</p>
              </div>

              <div className="form-group">
                <label>Intervalos de Tiempo</label>
                <p className="form-help-text">Define los horarios en los que estuviste expuesto al sol</p>
                {formData.intervals.map((interval, index) => (
                  <div key={index} className="interval-row">
                    <input
                      type="time"
                      value={interval.start}
                      onChange={(e) => handleIntervalChange(index, 'start', e.target.value)}
                      placeholder="Inicio"
                      required
                    />
                    <span className="interval-separator">-</span>
                    <input
                      type="time"
                      value={interval.end}
                      onChange={(e) => handleIntervalChange(index, 'end', e.target.value)}
                      placeholder="Fin"
                      required
                    />
                    {formData.intervals.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInterval(index)}
                        className="remove-interval-btn"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addInterval}
                  className="add-interval-btn"
                >
                  + Agregar intervalo
                </button>
                
                {/* Mostrar tiempo total calculado */}
                {formData.intervals.some(interval => interval.start && interval.end) && (
                  <div className="time-summary">
                    <span className="time-summary-label">Tiempo total:</span>
                    <span className="time-summary-value">
                      {(() => {
                        const totalMinutes = calculateTotalMinutes(formData.intervals);
                        const hours = Math.floor(totalMinutes / 60);
                        const minutes = totalMinutes % 60;
                        return `${hours}h ${minutes}min`;
                      })()}
                    </span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="submit-btn"
              >
                {submitting ? 'Registrando...' : 'Registrar Exposición'}
              </button>
            </form>
          </div>

          {/* Resumen de exposiciones de hoy */}
          {todaySummary && (
            <div className="today-summary-card">
              <h4 className="today-summary-title">Exposiciones de Hoy ({todaySummary.count})</h4>
              <div className="today-summary-content">
                <div className="summary-item">
                  <span className="summary-label">Tiempo total:</span>
                  <span className="summary-value">
                    {Math.floor(todaySummary.totalMinutes / 60)}h {todaySummary.totalMinutes % 60}min
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">UV acumulado:</span>
                  <span className="summary-value">{todaySummary.totalUV.toFixed(1)}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Ubicación:</span>
                  <span className="summary-value">{todaySummary.location}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Panel derecho - Historial */}
        <div className="exposure-right-panel">
          <div className="history-card">
            <h3 className="history-title">Historial de Exposiciones</h3>
            
            {exposures.length === 0 ? (
              <div className="no-exposures">
                <p>No hay exposiciones registradas.</p>
                <p>¡Comienza registrando tu primera exposición!</p>
              </div>
            ) : (
              <div className="exposures-list">
                {exposures.map((exposure, index) => {
                  const risk = calculateRisk(exposure.uvEstimated);
                  return (
                    <div key={index} className="exposure-item">
                      <div className="exposure-header">
                        <span className="exposure-date">
                          {new Date(exposure.date).toLocaleDateString('es-ES', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <div className="exposure-actions">
                          <span 
                            className="risk-badge"
                            style={{ backgroundColor: risk.color }}
                          >
                            {risk.level}
                          </span>
                          <button
                            onClick={() => handleDeleteExposure(exposure._id)}
                            disabled={deleting === exposure._id}
                            className="delete-exposure-btn"
                            title="Eliminar exposición"
                          >
                            {deleting === exposure._id ? '...' : '🗑️'}
                          </button>
                        </div>
                      </div>
                      
                      <div className="exposure-details">
                        <div className="detail-row">
                          <span className="detail-label">Tiempo:</span>
                          <span className="detail-value">
                            {Math.floor(exposure.minutesExposed / 60)}h {exposure.minutesExposed % 60}min
                          </span>
                        </div>
                        
                        <div className="detail-row">
                          <span className="detail-label">UV:</span>
                          <span className="detail-value">{exposure.uvEstimated}</span>
                        </div>
                        
                        <div className="detail-row">
                          <span className="detail-label">Ubicación:</span>
                          <span className="detail-value">{exposure.location}</span>
                        </div>
                        
                        {exposure.intervals && exposure.intervals.length > 0 && (
                          <div className="detail-row">
                            <span className="detail-label">Horarios:</span>
                            <span className="detail-value">
                              {exposure.intervals.map((interval, i) => 
                                `${interval.start}-${interval.end}`
                              ).join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExposureManager; 