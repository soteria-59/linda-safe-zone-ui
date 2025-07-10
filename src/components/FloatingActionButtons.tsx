import React, { useState } from 'react';
import { Navigation, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface FloatingActionButtonsProps {
  onNearestSafeZone?: () => void;
  showOnlyReportChaos?: boolean;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({ 
  onNearestSafeZone,
  showOnlyReportChaos = false 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNearestSafeZone = () => {
    if (onNearestSafeZone) {
      onNearestSafeZone();
    } else {
      // Default behavior for home page
      toast({
        title: "Navigating to Map",
        description: "Opening live map to show nearest safe zones.",
      });
      navigate('/map?showSafeZones=true');
    }
  };

  const handleReportChaos = () => {
    navigate('/report');
  };

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 pointer-events-none">
      <div className="flex justify-between items-end max-w-sm mx-auto pointer-events-auto">
        {!showOnlyReportChaos && (
          <Button 
            onClick={handleNearestSafeZone}
            className="bg-green-600 hover:bg-green-700 text-white shadow-2xl rounded-full px-6 py-3 flex items-center gap-2 transition-all duration-200 hover:scale-105"
          >
            <Navigation className="w-4 h-4" />
            <span className="font-medium">Safe Zone</span>
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
  );
};

export default FloatingActionButtons;