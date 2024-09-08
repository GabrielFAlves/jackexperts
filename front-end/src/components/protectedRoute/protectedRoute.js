// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ element: Element }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Verifica se o token está presente no localStorage
  const token = localStorage.getItem('token');

  // Se o token não estiver presente, redireciona para o login
  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Caso contrário, renderiza o componente protegido
  return <Element />;
};

export default ProtectedRoute;
