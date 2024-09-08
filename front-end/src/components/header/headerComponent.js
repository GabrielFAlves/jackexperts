import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import jack from '../../assets/jackheader.png';

const HeaderComponent = () => {
  const { logout } = useAuth();

  return (
    <header className="p-4 text-white flex justify-between items-center bg-white shadow-md">
      <div
        className="w-32 h-16 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${jack})` }}
      >
      </div>
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
