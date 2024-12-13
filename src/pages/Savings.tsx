'use client';

import { useState } from 'react';
import { Button } from '../components/ui/button';

export default function SavingsPage() {
  const [selectedAccount, setSelectedAccount] = useState('Savings Account');
  const [selectedItem, setSelectedItem] = useState('Item 1');
  const [amount, setAmount] = useState('');

  const handleSave = () => {
    alert(`Saved Rp${amount} to ${selectedAccount}`);
    setAmount('');
  };

  const handleTake = () => {
    alert(`Took Rp${amount} from ${selectedAccount}`);
    setAmount('');
  };

  const handleTrack = () => {
    alert(`Tracking transactions for ${selectedAccount}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Account Dropdown */}
      <div className="w-3/4 max-w-md mb-4">
        <select
          id="account"
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
          className="w-full px-4 py-2 bg-blue-700 text-white rounded-md"
        >
          <option value="Category">Category</option>
          <option value="Savings">Savings</option>
          <option value="Investment">Investment</option>
        </select>
      </div>

      {/* Item Dropdown */}
      <div className="w-3/4 max-w-md mb-4">
        <select
          id="item"
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          className="w-full px-4 py-2 bg-blue-700 text-white rounded-md"
        >
          <option value="Item">Item</option>
          <option value="Dana Darurat">Dana Darurat</option>
          <option value="Wishlist">Wishlist</option>
        </select>
      </div>

      {/* Amount Input */}
      <div className="w-3/4 max-w-md mb-6">
        <input
          id="amount"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full px-4 py-2 bg-blue-100 border border-blue-200 rounded-md"
        />
      </div>

      {/* Buttons */}
      {selectedAccount !== 'Investment' && (
        <div className="flex justify-center gap-4 mb-6">
          <Button
            onClick={handleSave}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save
          </Button>
          <Button
            onClick={handleTake}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Take
          </Button>
        </div>
      )}

      {/* Track Button */}
      <div className="w-3/4 max-w-md">
        <Button
          onClick={handleTrack}
          className="w-full px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
        >
          Track
        </Button>
      </div>
    </div>
  );
}
