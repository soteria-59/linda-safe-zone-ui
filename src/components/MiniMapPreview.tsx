
import React from 'react';
import { Map, MapPin, Navigation } from 'lucide-react';

const MiniMapPreview = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Map Preview Area */}
      <div className="h-40 bg-gradient-to-br from-green-100 to-gray-100 relative p-4">
        {/* Simulated map background */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gray-300 rounded-lg"></div>
        </div>
        
        {/* Current location indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        </div>
        
        {/* Safe zones */}
        <div className="absolute top-6 left-6">
          <div className="w-3 h-3 bg-green-500 rounded-full opacity-80"></div>
        </div>
        <div className="absolute bottom-8 right-8">
          <div className="w-3 h-3 bg-green-500 rounded-full opacity-80"></div>
        </div>
        
        {/* Danger zones */}
        <div className="absolute top-12 right-12">
          <div className="w-3 h-3 bg-red-500 rounded-full opacity-80"></div>
        </div>
        
        {/* View Full Map Button */}
        <button className="absolute bottom-3 right-3 bg-black text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors">
          View Full Map
        </button>
      </div>
      
      {/* Map Info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-900">Nearest Safe Zone:</span>
          </div>
          <div className="text-sm text-gray-600">1.2 km</div>
        </div>
        <p className="text-sm text-green-700 font-medium mt-1">All Saints Cathedral</p>
      </div>
    </div>
  );
};

export default MiniMapPreview;
