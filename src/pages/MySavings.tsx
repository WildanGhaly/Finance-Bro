import React, { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SavingsItem {
  name: string;
  amount: string;
  percentage: number;
}

const MySavingsPage: React.FC = () => {
  const navigate = useNavigate();

  const [savingsItems, setSavingsItems] = useState<SavingsItem[]>([
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
  ]);

  const [investmentItems, setInvestmentItems] = useState<SavingsItem[]>([
    {
      name: 'Saham',
      amount: 'Rp500,000.00',
      percentage: 25,
    },
    {
      name: 'Pasar Uang',
      amount: 'Rp200,000.00',
      percentage: 10,
    },
    {
      name: 'Obligasi',
      amount: 'Rp300,000.00',
      percentage: 15,
    },
  ]);

  const [isAddingSaving, setIsAddingSaving] = useState(false);
  const [isAddingInvestment, setIsAddingInvestment] = useState(false);

  const [newSaving, setNewSaving] = useState<SavingsItem>({
    name: '',
    amount: '',
    percentage: 0,
  });

  const [newInvestment, setNewInvestment] = useState<SavingsItem>({
    name: '',
    amount: '',
    percentage: 0,
  });

  const handleAddSaving = () => {
    if (newSaving.name && newSaving.amount && newSaving.percentage > 0) {
      setSavingsItems((prevItems) => [...prevItems, newSaving]);
      setNewSaving({ name: '', amount: '', percentage: 0 });
      setIsAddingSaving(false);
    } else {
      alert('Please fill out all fields correctly!');
    }
  };

  const handleAddInvestment = () => {
    if (newInvestment.name && newInvestment.amount && newInvestment.percentage > 0) {
      setInvestmentItems((prevItems) => [...prevItems, newInvestment]);
      setNewInvestment({ name: '', amount: '', percentage: 0 });
      setIsAddingInvestment(false);
    } else {
      alert('Please fill out all fields correctly!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl mb-6">
        <Button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-blue-900 bg-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-50"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Savings Section */}
        <div className="bg-blue-900 text-white p-6 rounded-lg flex flex-col items-center justify-center">
          <div className="w-full flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Saving</h2>
            <Button
              size="icon"
              className="w-10 h-10 rounded-full bg-primary"
              onClick={() => setIsAddingSaving(true)}
            >
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

        {/* Investment Section */}
        <div className="bg-blue-900 text-white p-6 rounded-lg flex flex-col items-center justify-center">
          <div className="w-full flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Investment</h2>
            <Button
              size="icon"
              className="w-10 h-10 rounded-full bg-primary"
              onClick={() => setIsAddingInvestment(true)}
            >
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

      {/* Modal for Adding Saving */}
      {isAddingSaving && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Saving</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={newSaving.name}
                onChange={(e) =>
                  setNewSaving((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Amount"
                value={newSaving.amount}
                onChange={(e) =>
                  setNewSaving((prev) => ({ ...prev, amount: e.target.value }))
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Percentage"
                value={newSaving.percentage}
                onChange={(e) =>
                  setNewSaving((prev) => ({
                    ...prev,
                    percentage: Number(e.target.value),
                  }))
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <Button
                onClick={() => setIsAddingSaving(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding Investment */}
      {isAddingInvestment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Investment</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={newInvestment.name}
                onChange={(e) =>
                  setNewInvestment((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Amount"
                value={newInvestment.amount}
                onChange={(e) =>
                  setNewInvestment((prev) => ({ ...prev, amount: e.target.value }))
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Percentage"
                value={newInvestment.percentage}
                onChange={(e) =>
                  setNewInvestment((prev) => ({
                    ...prev,
                    percentage: Number(e.target.value),
                  }))
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <Button
                onClick={() => setIsAddingInvestment(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddInvestment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySavingsPage;
