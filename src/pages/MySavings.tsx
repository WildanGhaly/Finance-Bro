import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft, TrashIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SavingsData {
  name: string;
  amount: number;
  type: 'investment' | 'saving';
}

interface RequestSaving {
  name: string;
  amount: number;
  type: 'investment' | 'saving';
}

interface ApiResponse {
  savings: SavingsData[];
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

const MySavingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [allSavings, setAllSavings] = useState<SavingsData[]>([]);
  const [isAddingSaving, setIsAddingSaving] = useState(false);
  const [isAddingInvestment, setIsAddingInvestment] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const savingsItems = allSavings.filter((item) => item.type === 'saving');
  const investmentItems = allSavings.filter((item) => item.type === 'investment');

  useEffect(() => {
      fetchSavings();
  }, []);

  const fetchSavings = async () => {
    try {
        const response = await fetch('https://financebro-backend-958019176719.us-central1.run.app/tracker/savings', {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch savings');
        
        const data: ApiResponse = await response.json();
        setAllSavings(data.savings);
        
        const total = data.savings.reduce((sum, item) => sum + item.amount, 0);
        setTotalAmount(total);
    } catch (error) {
        console.error('Error fetching savings:', error);
    }
  };

  const calculatePercentage = (amount: number) => {
    return Math.round((amount / totalAmount) * 100);
  };

  const [newSaving, setNewSaving] = useState<RequestSaving>({
    name: '',
    amount: 0,
    type: 'saving',
  });

  const [newInvestment, setNewInvestment] = useState<RequestSaving>({
    name: '',
    amount: 0,
    type: 'investment',
  });

  const handleAdd = (Saving: RequestSaving) => async () => {
    try {
      const response = await fetch('https://financebro-backend-958019176719.us-central1.run.app/tracker/savings', {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(Saving),
      });
      if (!response.ok) throw new Error('Failed to add saving');

      fetchSavings();
      if (Saving.type === 'saving') {
        setNewSaving({ name: '', amount: 0, type: 'saving' });
        setIsAddingSaving(false);
      } else {
        setNewInvestment({ name: '', amount: 0, type: 'investment' });
        setIsAddingInvestment(false);
      }
    } catch (error) {
      console.error('Error adding saving:', error);
    }
  };

  const handleDelete = (name: string) => async () => {
    try {
      const response = await fetch(`https://financebro-backend-958019176719.us-central1.run.app/tracker/savings`, {
        method: 'DELETE',
        headers: getHeaders(true),
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error('Failed to delete saving');

      fetchSavings();
    } catch (error) {
      console.error('Error deleting saving:', error);
    }
  }

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
        <div className="bg-blue-900 text-white p-6 rounded-lg flex flex-col items-center">
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
                <TrashIcon
                  className="w-6 h-6 cursor-pointer"
                  onClick={handleDelete(item.name)}
                />
            </div>
          ))}
        </div>

        <div className="bg-blue-900 text-white p-6 rounded-lg flex flex-col items-center">
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
              <TrashIcon
                className="w-6 h-6 cursor-pointer"
                onClick={handleDelete(item.name)}
              />
            </div>
          ))}
        </div>
      </div>

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
                  setNewSaving((prev) => ({ ...prev, amount: Number(e.target.value) }))
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
                onClick={handleAdd(newSaving)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}

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
                  setNewInvestment((prev) => ({ ...prev, amount: Number(e.target.value) }))
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
                onClick={handleAdd(newInvestment)}
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