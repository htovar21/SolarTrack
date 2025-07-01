import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './HeroSection.css';

function HeroSection() {
  const navigate = useNavigate();
  const { isAuthenticated, showLogin } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      showLogin();
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Tu asistente solar diario</h1>
        <p>SolarTrack te ayuda a monitorear tu exposición solar y te ofrece recomendaciones inteligentes para proteger tu piel, adaptadas al clima y a tu actividad.</p>
        <button className="hero-btn" onClick={handleClick}>Empieza gratis hoy</button>
      </div>
      <div className="hero-image">
        <img 
          src="https://cdn.pixabay.com/photo/2016/11/29/06/17/woman-1867757_960_720.jpg" 
          alt="Mujer disfrutando del sol al aire libre" 
          className="hero-img"
        />
      </div>
    </section>
  );
}

export default HeroSection; 