'use client'

import React from 'react';
import moneyBagSvg from '../assets/money-bag.svg';
import moneyFilledSvg from '../assets/money-filled.svg';
import clockSvg from '../assets/clock.svg';

const SavingsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        <div className="bg-blue-900 text-white p-6 rounded-lg flex flex-col items-center justify-center">
          <img src={moneyBagSvg} alt="Money Bag" className="w-12 h-12 mb-4" />
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold">Your target amount of savings is...</h3>
            <p className="text-3xl font-bold">Rp41,883,116,151</p>
          </div>
        </div>
        <div className="bg-blue-900 text-white p-6 rounded-lg flex flex-col items-center justify-center">
          <img src={moneyFilledSvg} alt="Money" className="w-12 h-12 mb-4" />
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold">in a month you must save...</h3>
            <p className="text-3xl font-bold">Rp1,083,046,853</p>
          </div>
        </div>
        <div className="bg-blue-900 text-white p-6 rounded-lg flex flex-col items-center justify-center">
          <img src={clockSvg} alt="Clock" className="w-12 h-12 mb-4" />
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold">in this period</h3>
            <p className="text-3xl font-bold">34 years</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsPage;