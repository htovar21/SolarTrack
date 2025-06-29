import React, { useEffect, useState } from 'react';
import { getExposures } from '../services/api';
import './ExposureTable.css';

const riskColor = {
  'Bajo': 'risk-badge-low',
  'Medio': 'risk-badge-medium',
  'Alto': 'risk-badge-high',
};

function calcularRiesgo(uv) {
  if (uv >= 20) return 'Alto';
  if (uv >= 10) return 'Medio';
  return 'Bajo';
}

function ExposureTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (!user) {
      setError('No hay usuario autenticado.');
      setLoading(false);
      return;
    }
    getExposures(user.id, token).then(res => {
      setData(res);
      setLoading(false);
    }).catch(() => {
      setError('Error al cargar historial.');
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{padding: 20}}>Cargando historial...</div>;
  if (error) return <div style={{padding: 20, color: 'red'}}>{error}</div>;

  return (
    <div className="exposure-table-card">
      <span className="exposure-table-title">Historial de Exposición</span>
      <table className="exposure-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tiempo Expuesto</th>
            <th>UV Estimado</th>
            <th>Riesgo</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={4} style={{textAlign:'center'}}>No hay exposiciones registradas.</td></tr>
          ) : data.map((row, i) => (
            <tr key={i}>
              <td>{new Date(row.date).toLocaleDateString()}</td>
              <td>{row.minutesExposed} min ({Math.floor((row.minutesExposed||0)/60)}h {(row.minutesExposed||0)%60}min)</td>
              <td>{row.uvEstimated} UV</td>
              <td><span className={`risk-badge ${riskColor[calcularRiesgo(row.uvEstimated)]}`}>{calcularRiesgo(row.uvEstimated)}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExposureTable; 