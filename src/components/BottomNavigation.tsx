
import React, { useState } from 'react';
import { Map, Book, AlertTriangle, User } from 'lucide-react';

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'map', icon: Map, label: 'Map' },
    { id: 'info', icon: Book, label: 'Info Hub' },
    { id: 'panic', icon: AlertTriangle, label: 'Panic', isPanic: true },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-40">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map(({ id, icon: Icon, label, isPanic }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
              isPanic
                ? 'bg-red-100 hover:bg-red-200'
                : activeTab === id
                ? 'bg-green-100 text-green-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon 
              className={`w-5 h-5 mb-1 ${
                isPanic 
                  ? 'text-red-600' 
                  : activeTab === id 
                  ? 'text-green-700' 
                  : 'text-current'
              }`} 
            />
            <span className={`text-xs font-medium ${
              isPanic 
                ? 'text-red-700' 
                : activeTab === id 
                ? 'text-green-700' 
                : 'text-current'
            }`}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
