import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './CallToAction.css';

function CallToAction() {
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
    <section className="cta-section">
      <div className="cta-background">
        <img 
          src="https://cdn.pixabay.com/photo/2023/08/27/00/08/cycling-8215968_640.jpg" 
          alt="Personas disfrutando actividades al aire libre" 
          className="cta-bg-img"
        />
        <div className="cta-overlay"></div>
      </div>
      <div className="cta-content">
        <h2>Empieza a proteger tu piel de forma inteligente hoy mismo.</h2>
        <button className="cta-btn" onClick={handleClick}>Empieza gratis hoy</button>
      </div>
    </section>
  );
}

export default CallToAction; 