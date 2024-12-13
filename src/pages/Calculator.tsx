'use client'

import React, { useState, useEffect } from 'react';
import moneyBagSvg from '../assets/money-bag.svg';
import moneyFilledSvg from '../assets/money-filled.svg';
import clockSvg from '../assets/clock.svg';

interface TargetedSaving {
  status: number;
  name: string;
  currentSavings: number;
  savingNeedPerMonth: number;
  savingGoal: number;
  savingPeriod: number;
}

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

const getHeaders = (contentType = false) => {
  const headers: Record<string, string> = {
    'Authorization': `Bearer ${getAuthToken()}`,
  };
  
  if (contentType) {
    headers['Content-Type'] = 'application/json';
  }
  
  return headers;
};

const Calculator: React.FC = () => {
  const [targetedSaving, setTargetedSaving] = useState<TargetedSaving | null>(null);

  useEffect(() => {
    fetchTargetedSaving();
  }, []);

  const fetchTargetedSaving = async () => {
    try {
      const response = await fetch('https://financebro-backend-958019176719.us-central1.run.app/calculator', {
        method: 'GET',
        headers: getHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch targeted saving');
      
      const data: TargetedSaving = await response.json();
      setTargetedSaving(data);
    } catch (error) {
      console.error('Error fetching targeted saving:', error);
    }
  };

  const formatAmount = (amount: number | null) => {
    return amount?.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        <div className="bg-blue-900 text-white p-6 rounded-lg flex flex-col items-center justify-center">
          <img src={moneyBagSvg} alt="Money Bag" className="w-12 h-12 mb-4" />
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold">Your target amount of savings is...</h3>
            <p className="text-3xl font-bold">Rp{formatAmount(targetedSaving?.savingGoal)}</p>
          </div>
        </div>
        <div className="bg-blue-900 text-white p-6 rounded-lg flex flex-col items-center justify-center">
          <img src={moneyFilledSvg} alt="Money" className="w-12 h-12 mb-4" />
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold">in a month you must save...</h3>
            <p className="text-3xl font-bold">Rp{formatAmount(targetedSaving?.savingNeedPerMonth)}</p>
          </div>
        </div>
        <div className="bg-blue-900 text-white p-6 rounded-lg flex flex-col items-center justify-center">
          <img src={clockSvg} alt="Clock" className="w-12 h-12 mb-4" />
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold">in this period</h3>
            <p className="text-3xl font-bold">{targetedSaving?.savingPeriod || 0} years</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
