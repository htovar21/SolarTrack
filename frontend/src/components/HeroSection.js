import React from 'react';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Tu asistente solar diario</h1>
        <p>SolarTrack te ayuda a monitorear tu exposición solar y te ofrece recomendaciones inteligentes para proteger tu piel, adaptadas al clima y a tu actividad.</p>
        <button className="hero-btn">Empieza gratis hoy</button>
      </div>
      <div className="hero-image">
        {/* Aquí irá la imagen principal de la landing page */}
      </div>
    </section>
  );
}

export default HeroSection; 