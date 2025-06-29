import React from 'react';
import './Benefits.css';

function Benefits() {
  return (
    <section className="benefits-section" id="features">
      <h2>Beneficios de SolarTrack</h2>
      <div className="benefits-list">
        <div className="benefit-card">
          {/* Ícono o imagen de clima y UV */}
          <h3>Clima y UV en Tiempo Real</h3>
          <p>Obtén información precisa sobre el clima y el índice UV de tu ubicación actual.</p>
        </div>
        <div className="benefit-card">
          {/* Ícono o imagen de registro */}
          <h3>Registro de Exposición Personal</h3>
          <p>Lleva un control detallado de tu tiempo al sol y la exposición UV acumulada.</p>
        </div>
        <div className="benefit-card">
          {/* Ícono o imagen de sugerencias */}
          <h3>Sugerencias Inteligentes Diarias</h3>
          <p>Recibe recomendaciones personalizadas para proteger tu piel según las condiciones.</p>
        </div>
      </div>
    </section>
  );
}

export default Benefits; 