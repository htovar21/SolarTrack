import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { login, register } from '../services/api';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { 
    isAuthenticated, 
    logout: contextLogout, 
    login: contextLogin,
    showLogin, 
    showSignup, 
    showLoginModal, 
    showSignupModal, 
    closeModals 
  } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.token) {
      contextLogin(res.token, res.user);
      setEmail('');
      setPassword('');
      navigate('/dashboard');
    } else {
      setError(res.message || 'Error al iniciar sesión');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); 
    setLoading(true);
    const res = await register(name, email, password);
    setLoading(false);
    if (res.message && res.message.includes('registrado')) {
      // Login automático tras registro
      const loginRes = await login(email, password);
      if (loginRes.token) {
        contextLogin(loginRes.token, loginRes.user);
        setEmail('');
        setPassword('');
        setName('');
        navigate('/dashboard');
      } else {
        setError('Registrado, pero error al iniciar sesión');
      }
    } else {
      setError(res.message || 'Error al registrar usuario');
    }
  };

  const handleLogout = () => {
    contextLogout();
    navigate('/');
  };

  const handleShowLogin = () => {
    setError('');
    showLogin();
  };

  const handleShowSignup = () => {
    setError('');
    showSignup();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img 
          src="/solartrack-logo.png" 
          alt="Logo de SolarTrack" 
          className="navbar-logo-img"
        />
        <span className="navbar-logo-text">SolarTrack</span>
      </div>
      <ul className="navbar-links">
        <li><a href="#features">Características</a></li>
        <li><a href="#testimonials">Testimonios</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {!isAuthenticated && (
          <>
            <button className="navbar-login" onClick={handleShowLogin}>Iniciar Sesión</button>
            <button className="navbar-login" onClick={handleShowSignup}>Registrarse</button>
          </>
        )}
        {isAuthenticated && (
          <button className="navbar-login" onClick={handleLogout}>Cerrar Sesión</button>
        )}
      </div>
      {showLoginModal && !isAuthenticated && (
        <div className="login-modal">
          <form className="login-form" onSubmit={handleLogin}>
            <h3>Iniciar Sesión</h3>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
            {error && <div className="login-error">{error}</div>}
            <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
            <button type="button" onClick={closeModals}>Cancelar</button>
            <div style={{marginTop:8}}>
              ¿No tienes cuenta? <span style={{color:'#2563eb', cursor:'pointer'}} onClick={handleShowSignup}>Regístrate</span>
            </div>
          </form>
        </div>
      )}
      {showSignupModal && !isAuthenticated && (
        <div className="login-modal">
          <form className="login-form" onSubmit={handleSignup}>
            <h3>Registrarse</h3>
            <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
            {error && <div className="login-error">{error}</div>}
            <button type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrarse'}</button>
            <button type="button" onClick={closeModals}>Cancelar</button>
            <div style={{marginTop:8}}>
              ¿Ya tienes cuenta? <span style={{color:'#2563eb', cursor:'pointer'}} onClick={handleShowLogin}>Inicia sesión</span>
            </div>
          </form>
        </div>
      )}
    </nav>
  );
}

export default Navbar; 