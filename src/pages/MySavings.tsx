import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/button';

interface SavingsItem {
  name: string;
  amount: string;
  percentage: number;
}

const MySavingsPage: React.FC = () => {
  const savingsItems: SavingsItem[] = [
    {
      name: 'Tabungan',
      amount: 'Rp500,000.00',
      percentage: 25,
    },
    {
      name: 'Dana Darurat',
      amount: 'Rp200,000.00',
      percentage: 10,
    },
    {
      name: 'Wishlist',
      amount: 'Rp300,000.00',
      percentage: 15,
    },
  ];

  const investmentItems: SavingsItem[] = [
    {
      name: 'Tabungan',
      amount: 'Rp500,000.00',
      percentage: 25,
    },
    {
      name: 'Dana Darurat',
      amount: 'Rp200,000.00',
      percentage: 10,
    },
    {
      name: 'Wishlist',
      amount: 'Rp300,000.00',
      percentage: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="bg-blue-900 text-white p-6 rounded-lg flex flex-col items-center justify-center">
          <div className="w-full flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Saving</h2>
            <Button size="icon" className="w-10 h-10 rounded-full bg-primary">
              <Plus className="w-6 h-6" />
            </Button>
          </div>
          {savingsItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full mb-4"
            >
              <div className="space-y-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-lg font-bold">{item.amount}</p>
              </div>
              <p className="text-2xl font-bold">{item.percentage}%</p>
            </div>
          ))}
        </div>
        <div className="bg-blue-900 text-white p-6 rounded-lg flex flex-col items-center justify-center">
          <div className="w-full flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Investment</h2>
            <Button size="icon" className="w-10 h-10 rounded-full bg-primary">
              <Plus className="w-6 h-6" />
            </Button>
          </div>
          {investmentItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full mb-4"
            >
              <div className="space-y-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-lg font-bold">{item.amount}</p>
              </div>
              <p className="text-2xl font-bold">{item.percentage}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MySavingsPage;