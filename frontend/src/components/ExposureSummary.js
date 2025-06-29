import React from 'react';
import './ExposureSummary.css';

function ExposureSummary({ summary }) {
  return (
    <div className="exposure-summary">
      <span className="exposure-summary-title">Exposición Registrada Hoy</span>
      <div className="exposure-summary-row">
        <span>Total de minutos expuesto:</span>
        <span className="exposure-summary-value">{summary ? `${summary.minutesExposed} min (${Math.floor((summary.minutesExposed||0)/60)}h ${(summary.minutesExposed||0)%60}min)` : '0 min (0h 0min)'}</span>
      </div>
      <div className="exposure-summary-row">
        <span>Estimación del UV acumulado:</span>
        <span className="exposure-summary-value">{summary ? `${summary.uvEstimated} UV` : '0 UV'}</span>
      </div>
      {!summary && <div style={{color:'#888', marginTop:8}}>No hay exposición registrada hoy.</div>}
    </div>
  );
}

export default ExposureSummary; 