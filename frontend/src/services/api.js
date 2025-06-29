const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function register(name, email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
}

export async function getWeather(location) {
  const res = await fetch(`${API_URL}/weather?location=${encodeURIComponent(location)}`);
  return res.json();
}

export async function createExposure(data, token) {
  const res = await fetch(`${API_URL}/exposures`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getExposures(userId, token) {
  const res = await fetch(`${API_URL}/exposures?userId=${userId}`, {
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  });
  return res.json();
}

export async function getTodayExposure(userId, token) {
  const res = await fetch(`${API_URL}/exposures/today?userId=${userId}`, {
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  });
  return res.json();
}

export async function getSummary(userId, token) {
  const res = await fetch(`${API_URL}/exposures/summary?userId=${userId}`, {
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  });
  return res.json();
}

export const deleteExposure = async (exposureId, token) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const response = await fetch(`${API_URL}/exposures/${exposureId}?userId=${user.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error('Error al eliminar exposición');
  }
  
  return response.json();
};

export async function updateUser(userId, data, token) {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify(data),
  });
  return res.json();
} 