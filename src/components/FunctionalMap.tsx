
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import { AlertTriangle, Shield, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface FunctionalMapProps {
  showSafeZones: boolean;
  showChaosZones: boolean;
  showPoliceBlocks: boolean;
  chaosReports: any[];
  panicAlerts: any[];
  onReportLocation?: (lat: number, lng: number) => void;
  reportMode?: boolean;
}

const FunctionalMap: React.FC<FunctionalMapProps> = ({
  showSafeZones,
  showChaosZones,
  showPoliceBlocks,
  chaosReports,
  panicAlerts,
  onReportLocation,
  reportMode = false
}) => {
  const [currentPosition, setCurrentPosition] = useState<LatLng | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition(new LatLng(position.coords.latitude, position.coords.longitude));
        },
        () => {
          // Default to Nairobi center if geolocation fails
          setCurrentPosition(new LatLng(-1.2921, 36.8219));
        }
      );
    } else {
      setCurrentPosition(new LatLng(-1.2921, 36.8219));
    }
  }, []);

  // Real safe zones locations in Nairobi
  const safeZones = [
    { 
      id: 1, 
      lat: -1.2833, 
      lng: 36.8167, 
      name: "All Saints Cathedral", 
      type: "Safe Zone",
      description: "Anglican Cathedral providing sanctuary and safety"
    },
    { 
      id: 2, 
      lat: -1.2921, 
      lng: 36.8219, 
      name: "Uhuru Park", 
      type: "Community Safe Zone",
      description: "Public recreational park - community gathering point"
    },
  ];

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        if (reportMode && onReportLocation) {
          onReportLocation(e.latlng.lat, e.latlng.lng);
        }
      },
    });
    return null;
  };

  if (!currentPosition) return <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" />;

  return (
    <MapContainer
      center={[currentPosition.lat, currentPosition.lng]}
      zoom={13}
      className="w-full h-full rounded-lg"
      style={{ minHeight: '400px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      <MapClickHandler />

      {/* Current Location */}
      <Marker position={[currentPosition.lat, currentPosition.lng]}>
        <Popup>
          <div className="text-center bg-blue-500 text-white p-2 rounded">
            <strong>📍 You are here</strong>
          </div>
        </Popup>
      </Marker>

      {/* Safe Zones - Only show the two specified locations */}
      {showSafeZones && safeZones.map((zone) => (
        <Marker key={`safe-${zone.id}`} position={[zone.lat, zone.lng]}>
          <Popup>
            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-green-500 min-w-48">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-green-700 text-lg">{zone.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{zone.description}</p>
              <div className="flex items-center justify-between">
                <div className="px-3 py-1 bg-green-100 rounded-full text-xs text-green-700 font-semibold">
                  ✅ {zone.type}
                </div>
                <div className="text-xs text-gray-500">
                  Safe Haven
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Chaos Reports - From database (currently empty) */}
      {showChaosZones && chaosReports.map((report) => (
        <Marker key={`chaos-${report.id}`} position={[report.location_lat, report.location_lng]}>
          <Popup>
            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-red-500 min-w-48">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 animate-pulse">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-red-700 text-lg">{report.danger_type}</h3>
              </div>
              {report.description && <p className="text-sm text-gray-600 mb-2">{report.description}</p>}
              <div className="flex items-center justify-between">
                <div className="px-3 py-1 bg-red-100 rounded-full text-xs text-red-700 font-semibold">
                  ⚠️ Danger Zone
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(report.created_at).toLocaleTimeString()}
                </div>
              </div>
              {report.is_verified && (
                <div className="mt-2 text-xs text-green-600">
                  ✓ Verified Report
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Panic Alerts - From database (currently empty) */}
      {panicAlerts.map((alert) => (
        <Marker key={`panic-${alert.id}`} position={[alert.location_lat, alert.location_lng]}>
          <Popup>
            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-red-800 min-w-48">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-red-800 rounded-full flex items-center justify-center mr-3 animate-ping">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-red-800 text-lg">🚨 PANIC ALERT</h3>
              </div>
              {alert.emergency_note && <p className="text-sm text-gray-600 mb-2">{alert.emergency_note}</p>}
              <div className="flex items-center justify-between">
                <div className="px-3 py-1 bg-red-200 rounded-full text-xs text-red-800 font-bold">
                  🆘 EMERGENCY
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(alert.created_at).toLocaleTimeString()}
                </div>
              </div>
              <div className="mt-2 text-xs text-red-600 animate-pulse">
                ⚡ Active Alert
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default FunctionalMap;
