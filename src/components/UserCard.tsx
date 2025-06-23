
import React from 'react';
import { User, Shield, MapPin } from 'lucide-react';

const UserCard = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-gray-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Welcome, Juma_34</h3>
          <div className="flex items-center space-x-4 mt-1">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Location Sharing: ON</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-600">Anonymous Mode</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
