import React from 'react';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Card className="p-6 rounded-lg shadow-lg bg-white">
        <p className="text-lg font-medium text-gray-800">{message}</p>
        <div className="mt-4">
          <Button onClick={onClose} className="bg-blue-500 hover:bg-blue-600 text-white">
            Close
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Popup;
