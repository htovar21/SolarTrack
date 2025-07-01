import React from 'react';
import './Benefits.css';

function Benefits() {
  return (
    <section className="benefits-section" id="features">
      <h2>Beneficios de SolarTrack</h2>
      <div className="benefits-list">
        <div className="benefit-card">
          <div className="benefit-icon">
            <img 
              src="https://cdn.pixabay.com/photo/2013/04/01/09/22/warm-98532_960_720.png" 
              alt="Icono de clima y UV en tiempo real" 
              className="benefit-img"
            />
          </div>
          <h3>Clima y UV en Tiempo Real</h3>
          <p>Obtén información precisa sobre el clima y el índice UV de tu ubicación actual.</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">
            <img 
              src="https://cdn.pixabay.com/photo/2013/07/12/19/03/checklist-154274_640.png" 
              alt="Icono de registro de exposición personal" 
              className="benefit-img"
            />
          </div>
          <h3>Registro de Exposición Personal</h3>
          <p>Lleva un control detallado de tu tiempo al sol y la exposición UV acumulada.</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">
            <img 
              src="https://cdn.pixabay.com/photo/2013/07/13/09/38/brain-155835_640.png" 
              alt="Icono de sugerencias inteligentes" 
              className="benefit-img"
            />
          </div>
          <h3>Sugerencias Inteligentes Diarias</h3>
          <p>Recibe recomendaciones personalizadas para proteger tu piel según las condiciones.</p>
        </div>
      </div>
    </section>
  );
}

export default Benefits; 