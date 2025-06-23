
import React, { useState } from 'react';
import { Map, Book, AlertTriangle, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab based on current route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/map') return 'map';
    if (path === '/info') return 'info';
    if (path === '/settings') return 'profile';
    return 'home';
  };

  const activeTab = getActiveTab();

  const navItems = [
    { id: 'map', icon: Map, label: 'Map', path: '/map' },
    { id: 'info', icon: Book, label: 'Info Hub', path: '/info' },
    { id: 'panic', icon: AlertTriangle, label: 'Panic', isPanic: true, action: 'panic' },
    { id: 'profile', icon: User, label: 'Profile', path: '/settings' }
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isPanic) {
      // Handle panic button action
      console.log('Panic button pressed!');
      // Could trigger emergency actions here
      return;
    }
    
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-40">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
              item.isPanic
                ? 'bg-red-100 hover:bg-red-200'
                : activeTab === item.id
                ? 'bg-green-100 text-green-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <item.icon 
              className={`w-5 h-5 mb-1 ${
                item.isPanic 
                  ? 'text-red-600' 
                  : activeTab === item.id 
                  ? 'text-green-700' 
                  : 'text-current'
              }`} 
            />
            <span className={`text-xs font-medium ${
              item.isPanic 
                ? 'text-red-700' 
                : activeTab === item.id 
                ? 'text-green-700' 
                : 'text-current'
            }`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
