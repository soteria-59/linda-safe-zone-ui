import React, { useState } from 'react';
import { Navigation, AlertTriangle, Car, User, Bus, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface FloatingActionButtonsProps {
  onNearestSafeZone?: (transportMode?: string) => void;
  showOnlyReportChaos?: boolean;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({ 
  onNearestSafeZone,
  showOnlyReportChaos = false 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showTransportOptions, setShowTransportOptions] = useState(false);
  const [showCabOptions, setShowCabOptions] = useState(false);
  const [showRouteNotes, setShowRouteNotes] = useState(false);

  const transportModes = [
    { id: 'walk', name: 'Walk', icon: User, description: 'Pedestrian shortcuts avoiding main roads' },
    { id: 'cab', name: 'Cab', icon: Car, description: 'Choose your preferred cab service' },
    { id: 'bus', name: 'Bus', icon: Bus, description: 'Public transport routes' },
    { id: 'private', name: 'Private', icon: Car, description: 'Private vehicle route' },
  ];

  const cabServices = [
    { id: 'uber', name: 'Uber', color: 'bg-black' },
    { id: 'bolt', name: 'Bolt', color: 'bg-green-600' },
    { id: 'little', name: 'Little', color: 'bg-orange-500' },
    { id: 'faras', name: 'Faras', color: 'bg-blue-600' },
    { id: 'weego', name: 'Weego', color: 'bg-purple-600' },
  ];

  const handleNearestSafeZone = () => {
    if (onNearestSafeZone) {
      setShowTransportOptions(true);
    } else {
      // Default behavior for home page
      toast({
        title: "Navigating to Map",
        description: "Opening live map to show nearest safe zones.",
      });
      navigate('/map?showSafeZones=true');
    }
  };

  const handleTransportSelect = (mode: string) => {
    if (mode === 'cab') {
      setShowCabOptions(true);
      setShowTransportOptions(false);
    } else {
      if (onNearestSafeZone) {
        onNearestSafeZone(mode);
      }
      setShowTransportOptions(false);
      setShowRouteNotes(true);
      
      const transportNames: { [key: string]: string } = {
        walk: 'Walking (shortcuts)',
        bus: 'Public transport',
        private: 'Private vehicle'
      };
      
      toast({
        title: "Safe Zone Route",
        description: `Finding ${transportNames[mode] || mode} route`,
      });
    }
  };

  const handleCabSelect = (cabService: string) => {
    if (onNearestSafeZone) {
      onNearestSafeZone('cab');
    }
    setShowCabOptions(false);
    setShowRouteNotes(true);
    
    toast({
      title: "Safe Zone Route",
      description: `Route calculated for ${cabService}`,
    });
  };

  const handleReportChaos = () => {
    navigate('/report');
  };

  return (
    <div className="relative flex flex-col gap-3 items-end">
      {/* Route Direction Notes - Expandable */}
      {showRouteNotes && (
        <Card className="absolute bottom-24 right-0 w-80 shadow-2xl bg-white border-green-600 border-2 animate-slide-in-right">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-green-700">Safe Route Directions</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowRouteNotes(false)}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                <span>Avoiding 3 danger zones</span>
              </div>
              <div className="flex items-center text-blue-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                <span>Using alternative side roads</span>
              </div>
              <div className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-gray-600 rounded-full mr-2"></div>
                <span>ETA: 12 minutes to safe zone</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cab Options Popup */}
      {showCabOptions && (
        <Card className="absolute bottom-24 right-0 w-64 shadow-2xl bg-white animate-scale-in">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900">Choose Your Cab</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowCabOptions(false)}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {cabServices.map((service) => (
                <Button
                  key={service.id}
                  variant="outline"
                  className="w-full justify-start hover:scale-105 transition-transform"
                  onClick={() => handleCabSelect(service.name)}
                >
                  <div className={`w-4 h-4 ${service.color} rounded mr-3`}></div>
                  {service.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transport Mode Options */}
      {showTransportOptions && (
        <Card className="absolute bottom-24 right-0 w-72 shadow-2xl bg-white animate-scale-in">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900">Choose Transport Mode</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowTransportOptions(false)}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {transportModes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <Button
                    key={mode.id}
                    variant="outline"
                    className="w-full justify-start text-left hover:scale-105 transition-transform"
                    onClick={() => handleTransportSelect(mode.id)}
                  >
                    <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{mode.name}</div>
                      <div className="text-xs text-gray-500">{mode.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {!showOnlyReportChaos && (
        <Button 
          onClick={handleNearestSafeZone}
          className="bg-green-600 hover:bg-green-700 text-white shadow-2xl rounded-full px-6 py-3 text-base font-semibold transform transition-all duration-200 hover:scale-105 relative"
          size="lg"
        >
          <Navigation className="w-5 h-5 mr-2" />
          Safe Zone Route
          <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showTransportOptions ? 'rotate-180' : ''}`} />
        </Button>
      )}
      
      <Button 
        onClick={handleReportChaos}
        className="bg-red-600 hover:bg-red-700 text-white shadow-2xl rounded-full px-6 py-3 text-base font-semibold transform transition-all duration-200 hover:scale-105"
        size="lg"
      >
        <AlertTriangle className="w-5 h-5 mr-2" />
        Report Chaos
      </Button>
    </div>
  );
};

export default FloatingActionButtons;