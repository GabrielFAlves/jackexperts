import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ element: Element }) => {
  const { user } = useAuth();
  const location = useLocation();

  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Element />;
};

export default ProtectedRoute;
