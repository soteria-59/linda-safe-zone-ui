import React, { useState } from 'react';
import FunctionalMap from '@/components/FunctionalMap';
import { MapPin } from 'lucide-react';

interface ReportChaosMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number } | null;
}

const ReportChaosMap: React.FC<ReportChaosMapProps> = ({ onLocationSelect, selectedLocation }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h2 className="font-semibold text-gray-900 mb-3 flex items-center">
        <MapPin className="w-5 h-5 text-red-600 mr-2" />
        Select Location
      </h2>
      
      <div className="relative h-64 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
        <FunctionalMap
          showSafeZones={false}
          showChaosZones={false}
          showPoliceBlocks={false}
          chaosReports={[]}
          panicAlerts={[]}
          onReportLocation={onLocationSelect}
          reportMode={true}
        />
        
        {/* Location marker overlay */}
        {selectedLocation && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1000]">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <MapPin className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
        
        {/* Instructions overlay */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none z-[1000]">
          {selectedLocation ? (
            <span className="bg-white px-3 py-1 rounded-full text-sm shadow">
              Location Selected
            </span>
          ) : (
            <span className="bg-white px-3 py-1 rounded-full text-sm shadow">
              Click on map to select location
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportChaosMap;