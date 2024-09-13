import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  const { token, user } = response.data;
  localStorage.setItem('token', token);
  axios.defaults.headers.common['x-auth-token'] = token;
  return user;
};

export const logout = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['x-auth-token'];
};