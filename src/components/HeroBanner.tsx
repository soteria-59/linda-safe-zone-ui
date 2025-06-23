
import React from 'react';
import { AlertTriangle, Calendar } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="relative mt-4 rounded-2xl overflow-hidden shadow-lg">
      {/* Background with Kenyan flag inspired gradient */}
      <div className="bg-gradient-to-br from-green-600 via-black to-red-600 p-6 text-white relative">
        {/* Overlay pattern for texture */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <div className="bg-red-500 p-1 rounded-full animate-pulse">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <span className="text-red-200 text-sm font-medium uppercase tracking-wide">Urgent</span>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Get Ready: Gen-Z Demos</h1>
          <div className="flex items-center space-x-2 mb-3">
            <Calendar className="w-4 h-4 text-green-300" />
            <span className="text-lg font-semibold text-green-300">June 25</span>
          </div>
          
          <p className="text-gray-200 mb-4 leading-relaxed">
            Plan your route. Know your rights. Stay protected.
          </p>
          
          <div className="flex space-x-2">
            <div className="bg-green-600/80 px-3 py-1 rounded-full text-sm font-medium">
              ⚖️ Rights
            </div>
            <div className="bg-red-600/80 px-3 py-1 rounded-full text-sm font-medium">
              🛡️ Safety
            </div>
          </div>
        </div>
        
        {/* Decorative shield overlay */}
        <div className="absolute top-4 right-4 opacity-20">
          <div className="w-16 h-16 border border-white/50 rounded-lg rotate-12"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
