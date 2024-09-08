// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Checa se há um token salvo e define o usuário ao iniciar o contexto
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); // Define o usuário como autenticado se o token existir
    }
  }, []);

  const login = async (email, password) => {
    setError('');
    try {
      const response = await axios.post('http://localhost:3333/api/auth/login', {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      setUser({ email });
      navigate('/tasks');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Falha no login. Verifique suas credenciais.';
      setError(errorMsg);
    }
  };

  const register = async (email, password) => {
    setError('');
    try {
      await axios.post('http://localhost:3333/api/auth/register', {
        email,
        password,
      });

      alert('Usuário registrado com sucesso!');
      navigate('/');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Falha no registro. Tente novamente.';
      setError(errorMsg);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const value = {
    user,
    login,
    register,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
