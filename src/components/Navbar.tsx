// src/components/Navbar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="flex justify-between items-center p-8 bg-[#031A6E] shadow-md rounded-bl-3xl rounded-br-3xl">
      <div className="flex items-center space-x-20">
        <Link
          to="/home"
          className={`text-xl font-bold ml-10 ${location.pathname === '/home' ? 'text-[#EBD671] underline' : 'text-white hover:text-[#EBD671]'}`}
        >
          Home
        </Link>
        <Link
          to="/prediction"
          className={`text-xl font-bold ${location.pathname === '/prediction' ? 'text-[#EBD671] underline' : 'text-white hover:text-[#EBD671]'}`}
        >
          Prediction
        </Link>
        <Link
          to="/savings"
          className={`text-xl font-bold ${location.pathname === '/savings' ? 'text-[#EBD671] underline' : 'text-white hover:text-[#EBD671]'}`}
        >
          Savings
        </Link>
        <Link
          to="/calculator"
          className={`text-xl font-bold ${location.pathname === '/calculator' ? 'text-[#EBD671] underline' : 'text-white hover:text-[#EBD671]'}`}
        >
          Calculator
        </Link>
        <Link
          to="/profile"
          className={`text-xl font-bold ${location.pathname === '/profile' ? 'text-[#EBD671] underline' : 'text-white hover:text-[#EBD671]'}`}
        >
          Profile
        </Link>
      </div>
      <div>
        <img src="/src/assets/logo.svg" alt="Logo" className="h-8" />
      </div>
    </nav>
  );
};

export default Navbar;
