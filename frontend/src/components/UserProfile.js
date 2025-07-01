import React, { useState } from 'react';
import { updateUser } from '../services/api';
import './UserProfile.css';

function UserProfile() {
  const userData = JSON.parse(localStorage.getItem('user')) || {};
  const token = localStorage.getItem('token');
  const [form, setForm] = useState({
    name: userData.name || '',
    email: userData.email || '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const res = await updateUser(userData.id, form, token);
      if (res.user) {
        setSuccess('Datos actualizados correctamente');
        localStorage.setItem('user', JSON.stringify(res.user));
        // Limpiar el campo de contraseña después de actualizar
        setForm(prev => ({ ...prev, password: '' }));
      } else {
        setError(res.message || 'Error al actualizar');
      }
    } catch (err) {
      setError('Error al actualizar: ' + (err.message || 'Error de conexión'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-profile-card">
      <div className="user-profile-header">
        <h2>Mi Perfil</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="user-profile-form">
        <label>Nombre
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>Nueva contraseña
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Dejar en blanco para no cambiar" />
        </label>
        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Guardar cambios'}</button>
      </form>
    </div>
  );
}

export default UserProfile; 