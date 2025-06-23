
import React from 'react';
import { Book, Heart, Shield, Calendar } from 'lucide-react';

const InfoHubCard = () => {
  const infoItems = [
    { icon: Shield, label: 'Rights', color: 'text-green-600' },
    { icon: Heart, label: 'First Aid', color: 'text-red-600' },
    { icon: Book, label: 'Safety Tips', color: 'text-black' }
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Offline Info Hub</h3>
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>Updated June 2025</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {infoItems.map(({ icon: Icon, label, color }) => (
          <button
            key={label}
            className="flex flex-col items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <Icon className={`w-6 h-6 ${color} mb-2`} />
            <span className="text-xs font-medium text-gray-700">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InfoHubCard;
