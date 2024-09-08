import React from 'react';
import { Link } from 'react-router-dom';
import mascotImage from '../../assets/mascote.png'; // Importa a imagem

const NotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h1 className='text-6xl font-bold mb-4'>Oops!</h1>
            <h1 className='text-6xl font-bold mb-4'>Page not found.</h1>
            <p className='text-xl font-bold text-slate-500 mb-4'>Error code: 404</p>
            <img className='w-96 mb-6' src={mascotImage} alt='Page not found' />
            <Link to="/" className="text-[#f7b815] hover:underline text-lg">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFound;
