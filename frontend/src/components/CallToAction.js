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
      <h2>Empieza a proteger tu piel de forma inteligente hoy mismo.</h2>
      <button className="cta-btn" onClick={handleClick}>Empieza gratis hoy</button>
    </section>
  );
}

export default CallToAction; 