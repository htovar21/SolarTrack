import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/api';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!localStorage.getItem('token'));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setShowLogin(false);
      setIsAuth(true);
      setEmail(''); setPassword('');
      navigate('/dashboard');
    } else {
      setError(res.message || 'Error al iniciar sesión');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    const res = await register(name, email, password);
    setLoading(false);
    if (res.message && res.message.includes('registrado')) {
      // Login automático tras registro
      const loginRes = await login(email, password);
      if (loginRes.token) {
        localStorage.setItem('token', loginRes.token);
        localStorage.setItem('user', JSON.stringify(loginRes.user));
        setShowSignup(false);
        setIsAuth(true);
        setEmail(''); setPassword(''); setName('');
        navigate('/dashboard');
      } else {
        setError('Registrado, pero error al iniciar sesión');
      }
    } else {
      setError(res.message || 'Error al registrar usuario');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuth(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">SolarTrack</div>
      <ul className="navbar-links">
        <li><a href="#features">Características</a></li>
        <li><a href="#testimonials">Testimonios</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {!isAuth && (
          <>
            <button className="navbar-login" onClick={() => { setShowLogin(true); setShowSignup(false); setError(''); }}>Iniciar Sesión</button>
            <button className="navbar-login" onClick={() => { setShowSignup(true); setShowLogin(false); setError(''); }}>Registrarse</button>
          </>
        )}
        {isAuth && (
          <button className="navbar-login" onClick={handleLogout}>Cerrar Sesión</button>
        )}
      </div>
      {showLogin && !isAuth && (
        <div className="login-modal">
          <form className="login-form" onSubmit={handleLogin}>
            <h3>Iniciar Sesión</h3>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
            {error && <div className="login-error">{error}</div>}
            <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
            <button type="button" onClick={() => setShowLogin(false)}>Cancelar</button>
            <div style={{marginTop:8}}>
              ¿No tienes cuenta? <span style={{color:'#2563eb', cursor:'pointer'}} onClick={() => { setShowSignup(true); setShowLogin(false); setError(''); }}>Regístrate</span>
            </div>
          </form>
        </div>
      )}
      {showSignup && !isAuth && (
        <div className="login-modal">
          <form className="login-form" onSubmit={handleSignup}>
            <h3>Registrarse</h3>
            <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
            {error && <div className="login-error">{error}</div>}
            <button type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrarse'}</button>
            <button type="button" onClick={() => setShowSignup(false)}>Cancelar</button>
            <div style={{marginTop:8}}>
              ¿Ya tienes cuenta? <span style={{color:'#2563eb', cursor:'pointer'}} onClick={() => { setShowLogin(true); setShowSignup(false); setError(''); }}>Inicia sesión</span>
            </div>
          </form>
        </div>
      )}
    </nav>
  );
}

export default Navbar; 