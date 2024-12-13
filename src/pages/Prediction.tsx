'use client'

import React, { useState } from 'react';
import dropdown from '../assets/dropdown.svg';

const Prediction: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white pt-10">
      <h1 className="text-2xl font-bold mb-6">StockPrediction</h1>
      
      <div className="w-3/4 max-w-md relative">
        <button 
          className="w-full px-4 py-2 bg-blue-700 text-white rounded-md flex justify-between items-center"
          onClick={toggleDropdown}
        >
          Choose Stock
          <img src={dropdown} alt="dropdown icon" className="w-6 h-6" />
        </button>

        {isOpen && (
          <div className="mt-2 bg-white shadow-md rounded-md w-full absolute z-10">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Apple, Inc.</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Microsoft, Corp.</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Tesla, Inc.</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Amazon, Inc.</li>
            </ul>
          </div>
        )}

        <div className="mt-4 flex items-center bg-blue-100 rounded-md p-4">
          <div className="w-2/3">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              {/* Prediction Graph */}
            </svg>
          </div>
          <div className="w-1/3 text-right">
            <h2 className="text-lg font-bold">Apple, Inc.</h2>
            <p className="text-xl font-bold text-blue-700">+2%</p>
            <p className="text-sm">in 7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prediction;
