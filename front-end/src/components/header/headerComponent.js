// src/components/HeaderComponent.js
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const HeaderComponent = () => {
  const { logout } = useAuth();

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <h1 className="text-2xl">Header</h1>
      <button
        onClick={logout}
        className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  );
};

export default HeaderComponent;
