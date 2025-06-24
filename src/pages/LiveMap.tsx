
import React, { useState } from 'react';
import { Layers, AlertTriangle, Shield, Navigation, MapPin, Search, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';

const LiveMap = () => {
  const [showSafeZones, setShowSafeZones] = useState(false);
  const [showChaosZones, setShowChaosZones] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      {/* Map Controls Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Live Protest Map</h1>
          
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Layer Toggles */}
          <div className="flex items-center space-x-3">
            <Button
              variant={showSafeZones ? "default" : "outline"}
              size="sm"
              onClick={() => setShowSafeZones(!showSafeZones)}
              className={`${showSafeZones ? 'bg-green-600 hover:bg-green-700' : 'border-green-600 text-green-600 hover:bg-green-50'}`}
            >
              <Shield className="w-4 h-4 mr-1" />
              Safe Zones
            </Button>
            
            <Button
              variant={showChaosZones ? "destructive" : "outline"}
              size="sm"
              onClick={() => setShowChaosZones(!showChaosZones)}
              className={`${!showChaosZones ? 'border-red-600 text-red-600 hover:bg-red-50' : ''}`}
            >
              <AlertTriangle className="w-4 h-4 mr-1" />
              Chaos Zones
            </Button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[calc(100vh-180px)]">
        {/* Simulated Map */}
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
          
          {/* Safe zones - only show when enabled */}
          {showSafeZones && (
            <>
              <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                  All Saints Cathedral
                  <div className="text-xs opacity-75">Verified Safe Zone</div>
                </div>
              </div>
              
              <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                  Uhuru Park
                  <div className="text-xs opacity-75">Community Safe Zone</div>
                </div>
              </div>

              <div className="absolute top-1/3 right-1/2 transform translate-x-1/4 -translate-y-1/2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                  University of Nairobi
                  <div className="text-xs opacity-75">Student Safe Zone</div>
                </div>
              </div>
            </>
          )}
          
          {/* Chaos zones - only show when enabled */}
          {showChaosZones && (
            <>
              <div className="absolute top-1/3 right-1/3 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse hover:scale-110 transition-transform cursor-pointer">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                  Tear Gas Reported
                  <div className="text-xs opacity-75">15 min ago</div>
                </div>
              </div>
              
              <div className="absolute bottom-1/3 left-1/4 transform -translate-x-1/2 translate-y-1/2">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse hover:scale-110 transition-transform cursor-pointer">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                  Police Roadblock
                  <div className="text-xs opacity-75">8 min ago</div>
                </div>
              </div>

              <div className="absolute top-2/3 right-1/5 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse hover:scale-110 transition-transform cursor-pointer">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                  Heavy Police Presence
                  <div className="text-xs opacity-75">3 min ago</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10">
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

        {/* Desktop Legend */}
        <div className="absolute top-6 right-6 bg-white rounded-lg shadow-lg p-4 z-10 hidden md:block">
          <h3 className="font-semibold text-gray-900 mb-3">Legend</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span>Your Location</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2 flex items-center justify-center">
                <Shield className="w-2 h-2 text-white" />
              </div>
              <span>Safe Zones</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2 flex items-center justify-center">
                <AlertTriangle className="w-2 h-2 text-white" />
              </div>
              <span>Danger Zones</span>
            </div>
          </div>
        </div>

        {/* Mobile Legend - Sheet */}
        <div className="absolute top-6 right-6 z-10 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Info className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Map Legend</SheetTitle>
                <SheetDescription>
                  Understanding the map symbols
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full mr-3"></div>
                  <span>Your Current Location</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full mr-3 flex items-center justify-center">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                  <span>Safe Zones (Churches, Hospitals)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-red-500 rounded-full mr-3 flex items-center justify-center">
                    <AlertTriangle className="w-3 h-3 text-white" />
                  </div>
                  <span>Danger Zones (Active Incidents)</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
