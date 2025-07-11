import React, { useState } from 'react';
import { Navigation, AlertTriangle, Car, PersonStanding, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const [selectedTransport, setSelectedTransport] = useState('walk');

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

  const handleTransportSelect = (transport: string) => {
    setSelectedTransport(transport);
    if (onNearestSafeZone) {
      onNearestSafeZone(transport);
    }
    setShowTransportOptions(false);
    
    const transportNames: { [key: string]: string } = {
      walk: 'Walking',
      car: 'Driving',
      bus: 'Public Transport',
      private: 'Private Transport'
    };
    
    toast({
      title: "Safe Zone Route",
      description: `Finding route by ${transportNames[transport] || transport}`,
    });
  };

  const handleReportChaos = () => {
    navigate('/report');
  };

  return (
    <>
      <div className="fixed bottom-20 left-4 right-4 z-40 pointer-events-none">
        <div className="flex justify-between items-end max-w-sm mx-auto pointer-events-auto">
          {!showOnlyReportChaos && (
            <Button 
              onClick={handleNearestSafeZone}
              className="bg-green-600 hover:bg-green-700 text-white shadow-2xl rounded-full px-6 py-3 flex items-center gap-2 transition-all duration-200 hover:scale-105"
            >
              <Navigation className="w-4 h-4" />
              <span className="font-medium">Safe Zone Route</span>
            </Button>
          )}
          
          <Button 
            onClick={handleReportChaos}
            className="bg-red-600 hover:bg-red-700 text-white shadow-2xl rounded-full px-6 py-3 flex items-center gap-2 transition-all duration-200 hover:scale-105"
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="font-medium">Report Chaos</span>
          </Button>
        </div>
      </div>

      {/* Transport Mode Selection Modal */}
      {showTransportOptions && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-lg font-semibold mb-4 text-center">Choose Transport Mode</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => handleTransportSelect('walk')}
                variant="outline"
                className="flex flex-col items-center gap-2 p-4 h-auto"
              >
                <PersonStanding className="w-6 h-6" />
                <span>Walk</span>
              </Button>
              <Button 
                onClick={() => handleTransportSelect('car')}
                variant="outline"
                className="flex flex-col items-center gap-2 p-4 h-auto"
              >
                <Car className="w-6 h-6" />
                <span>Car</span>
              </Button>
              <Button 
                onClick={() => handleTransportSelect('bus')}
                variant="outline"
                className="flex flex-col items-center gap-2 p-4 h-auto"
              >
                <Bus className="w-6 h-6" />
                <span>Public Transport</span>
              </Button>
              <Button 
                onClick={() => handleTransportSelect('private')}
                variant="outline"
                className="flex flex-col items-center gap-2 p-4 h-auto"
              >
                <Navigation className="w-6 h-6" />
                <span>Private</span>
              </Button>
            </div>
            <Button 
              onClick={() => setShowTransportOptions(false)}
              variant="ghost"
              className="w-full mt-4"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingActionButtons;