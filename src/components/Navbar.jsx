import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  // Get navigation function and authentication token from context
  const { navigate, token } = useAppContext();

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      {/* Logo - navigate to home on click */}
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className="w-16 sm:w-22 cursor-pointer"
      />
      
      {/* Login/Dashboard button - changes based on auth status */}
      <button
        onClick={() => navigate('/admin')}
        className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
      >
        {token ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} className="w-3" alt="arrow" />
      </button>
    </div>
  );
};

export default Navbar;
