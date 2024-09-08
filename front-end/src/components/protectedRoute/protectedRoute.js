// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ element: Element }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Se o usuário não estiver autenticado, redirecione para a página de login
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Caso contrário, renderize o componente protegido
  return <Element />;
};

export default ProtectedRoute;
