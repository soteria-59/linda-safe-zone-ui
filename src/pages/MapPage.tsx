
import React, { useState } from 'react';
import { ArrowLeft, Layers, AlertTriangle, Shield, Navigation, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const MapPage = () => {
  const [showSafeZones, setShowSafeZones] = useState(true);
  const [showChaosZones, setShowChaosZones] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between relative z-10">
        <button onClick={() => navigate('/')} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Live Protest Map</h1>
        <div className="w-9"></div> {/* Spacer for centering */}
      </header>

      {/* Map Container */}
      <div className="relative flex-1 h-[calc(100vh-64px)]">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-gray-200">
          {/* Map grid pattern */}
          <div className="absolute inset-0 opacity-20" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '50px 50px'
               }}>
          </div>
          
          {/* Current location */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
              You are here
            </div>
          </div>
          
          {/* Safe zones */}
          {showSafeZones && (
            <>
              <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                  All Saints Cathedral
                </div>
              </div>
              
              <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                  Uhuru Park
                </div>
              </div>
            </>
          )}
          
          {/* Chaos zones */}
          {showChaosZones && (
            <>
              <div className="absolute top-1/3 right-1/3 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <AlertTriangle className="w-3 h-3 text-white" />
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                  Tear Gas Reported
                </div>
              </div>
              
              <div className="absolute bottom-1/3 left-1/4 transform -translate-x-1/2 translate-y-1/2">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <AlertTriangle className="w-3 h-3 text-white" />
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                  Police Roadblock
                </div>
              </div>
            </>
          )}
        </div>

        {/* Layer Toggle Controls */}
        <div className="absolute top-4 right-4 space-y-2 z-10">
          <Button
            variant={showSafeZones ? "default" : "outline"}
            size="sm"
            onClick={() => setShowSafeZones(!showSafeZones)}
            className={`${showSafeZones ? 'bg-green-600 hover:bg-green-700' : ''}`}
          >
            <Shield className="w-4 h-4 mr-1" />
            Safe Zones
          </Button>
          
          <Button
            variant={showChaosZones ? "destructive" : "outline"}
            size="sm"
            onClick={() => setShowChaosZones(!showChaosZones)}
          >
            <AlertTriangle className="w-4 h-4 mr-1" />
            Chaos Zones
          </Button>
        </div>

        {/* Bottom Action Buttons */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
          {/* Nearest Safe Area */}
          <Button className="bg-green-600 hover:bg-green-700 shadow-lg">
            <Navigation className="w-4 h-4 mr-2" />
            Nearest Safe Area
          </Button>
          
          {/* Report Chaos Button */}
          <Button 
            onClick={() => navigate('/report')}
            className="bg-red-600 hover:bg-red-700 shadow-lg"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Report Chaos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
