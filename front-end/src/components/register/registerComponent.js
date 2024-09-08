import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import mascotImage from '../../assets/mascote.png';

const RegisterComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, error } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:flex md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${mascotImage})` }}>
      </div>
      <div className="flex-1 p-8 flex items-center justify-center bg-white">
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-shadow-yellow">Registrar</h2>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f7b815]"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f7b815]"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#f7b815] text-white font-semibold rounded-md shadow-sm hover:bg-[#e09b1e] focus:outline-none focus:ring-2 focus:ring-[#f7b815]"
            >
              Registrar
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Already have an account?</p>
            <Link
              to="/"
              className="text-[#f7b815] hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
