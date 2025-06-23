
import React, { useState } from 'react';
import { AlertTriangle, Phone } from 'lucide-react';

const PanicButton = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePanicPress = () => {
    setIsPressed(true);
    // Add panic button logic here
    setTimeout(() => setIsPressed(false), 2000);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <button
        onClick={handlePanicPress}
        className={`w-16 h-16 rounded-full shadow-lg transition-all duration-200 ${
          isPressed 
            ? 'bg-red-700 scale-110' 
            : 'bg-red-600 hover:bg-red-700 hover:scale-105'
        }`}
      >
        <div className="flex items-center justify-center">
          {isPressed ? (
            <Phone className="w-8 h-8 text-white animate-pulse" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-white" />
          )}
        </div>
      </button>
      
      {/* Tooltip */}
      <div className="absolute -top-10 right-1/2 transform translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
        Tap in danger
      </div>
    </div>
  );
};

export default PanicButton;
