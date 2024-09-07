// src/contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Cria o contexto de autenticação
const AuthContext = createContext();

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

// Provider que envolverá a aplicação para fornecer o estado de autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado do usuário autenticado
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Função para realizar o login
  const login = async (email, password) => {
    setError(''); // Limpa o erro antes do login
    try {
      const response = await axios.post('http://localhost:3333/api/auth/login', {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token); // Salva o token no localStorage
      setUser({ email }); // Atualiza o estado do usuário
      navigate('/tasks'); // Redireciona para uma rota protegida
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Falha no login. Verifique suas credenciais.';
      setError(errorMsg);
    }
  };

  // Função para realizar o logout
  const logout = () => {
    localStorage.removeItem('token'); // Remove o token do armazenamento
    setUser(null); // Limpa o estado do usuário
    navigate('/'); // Redireciona para a página de login
  };

  // Valor do contexto, com o estado do usuário e as funções de autenticação
  const value = {
    user,
    login,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
