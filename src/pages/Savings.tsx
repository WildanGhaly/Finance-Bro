'use client';

import { useState } from 'react';
import { Button } from '../components/ui/button';

export default function SavingsPage() {
  const [selectedAccount, setSelectedAccount] = useState<string>('Savings Account');
  const [amount, setAmount] = useState<string>('');

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
    <div className="min-h-screen bg-gray-100">
      {/* Savings Section */}
      <div className="p-6">
        {/* Account Dropdown */}
        <div className="mb-4">
          <label htmlFor="account" className="block text-lg font-medium mb-2">
            Account
          </label>
          <select
            id="account"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="w-full px-4 py-2 border rounded bg-blue-600 text-white"
          >
            <option value="Savings Account">Savings Account</option>
            <option value="Emergency Fund">Emergency Fund</option>
            <option value="Wishlist">Wishlist</option>
          </select>
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-lg font-medium mb-2">
            Amount
          </label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-2 border rounded bg-gray-50"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <Button
            onClick={handleSave}
            className="w-full bg-green-500 text-white hover:bg-green-600"
          >
            Save
          </Button>
          <Button
            onClick={handleTake}
            className="w-full bg-red-500 text-white hover:bg-red-600"
          >
            Take
          </Button>
        </div>

        {/* Track Button */}
        <div className="mt-4">
          <Button
            onClick={handleTrack}
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
          >
            Track
          </Button>
        </div>
      </div>
    </div>
  );
}
