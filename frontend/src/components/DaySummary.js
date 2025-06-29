import React from 'react';
import './DaySummary.css';

function DaySummary({ hours, uvAccum }) {
  return (
    <div className="day-summary">
      <div className="day-summary-header">
        <span className="day-summary-title">Resumen del Día</span>
        <div className="day-summary-values">
          <div>{hours}</div>
          <div>{uvAccum}</div>
        </div>
      </div>
      <div className="day-summary-details">
        <div>Total de horas expuesto al sol hoy:</div>
        <div>Estimación del UV acumulado:</div>
      </div>
      <button className="day-summary-btn">Registrar exposición</button>
    </div>
  );
}

export default DaySummary; 