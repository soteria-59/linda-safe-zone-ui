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

  // Sample safe zones in Nairobi
  const safeZones = [
    { id: 1, lat: -1.2833, lng: 36.8167, name: "All Saints Cathedral", type: "Verified Safe Zone" },
    { id: 2, lat: -1.2921, lng: 36.8280, name: "Uhuru Park", type: "Community Safe Zone" },
    { id: 3, lat: -1.2795, lng: 36.8151, name: "University of Nairobi", type: "Student Safe Zone" },
  ];

  // Sample police blocks
  const policeBlocks = [
    { id: 1, lat: -1.2700, lng: 36.8400, name: "Police Checkpoint", type: "Active Block" },
    { id: 2, lat: -1.3000, lng: 36.8100, name: "Road Block", type: "Traffic Control" },
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
      // @ts-ignore
      center={currentPosition}
      zoom={13}
      className="w-full h-full rounded-lg"
      style={{ minHeight: '400px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // @ts-ignore
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      <MapClickHandler />

      {/* Current Location */}
      <Marker position={currentPosition}>
        <Popup>
          <div className="text-center bg-blue-500 text-white p-2 rounded">
            <strong>📍 You are here</strong>
          </div>
        </Popup>
      </Marker>

      {/* Safe Zones */}
      {showSafeZones && safeZones.map((zone) => (
        <Marker key={`safe-${zone.id}`} position={[zone.lat, zone.lng]}>
          <Popup>
            <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-green-500">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <h3 className="font-semibold text-green-700">{zone.name}</h3>
              </div>
              <p className="text-sm text-gray-600">{zone.type}</p>
              <div className="mt-2 px-2 py-1 bg-green-100 rounded text-xs text-green-700">
                ✅ Safe Zone
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Chaos Reports */}
      {showChaosZones && chaosReports.map((report) => (
        <Marker key={`chaos-${report.id}`} position={[report.location_lat, report.location_lng]}>
          <Popup>
            <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-red-500">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-2">
                  <AlertTriangle className="w-3 h-3 text-white" />
                </div>
                <h3 className="font-semibold text-red-700">{report.danger_type}</h3>
              </div>
              {report.description && <p className="text-sm text-gray-600 mt-1">{report.description}</p>}
              <div className="mt-2 px-2 py-1 bg-red-100 rounded text-xs text-red-700">
                ⚠️ {new Date(report.created_at).toLocaleTimeString()}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Police Blocks */}
      {showPoliceBlocks && policeBlocks.map((block) => (
        <Marker key={`police-${block.id}`} position={[block.lat, block.lng]}>
          <Popup>
            <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-blue-600">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <h3 className="font-semibold text-blue-700">{block.name}</h3>
              </div>
              <p className="text-sm text-gray-600">{block.type}</p>
              <div className="mt-2 px-2 py-1 bg-blue-100 rounded text-xs text-blue-700">
                🚔 Police Block
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Panic Alerts with Waveform Effect */}
      {panicAlerts.map((alert) => (
        <Marker key={`panic-${alert.id}`} position={[alert.location_lat, alert.location_lng]}>
          <Popup>
            <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-red-800 animate-pulse">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-red-800 rounded-full flex items-center justify-center mr-2 animate-ping">
                  <AlertTriangle className="w-3 h-3 text-white" />
                </div>
                <h3 className="font-semibold text-red-800">🚨 PANIC ALERT</h3>
              </div>
              {alert.emergency_note && <p className="text-sm text-gray-600 mt-1">{alert.emergency_note}</p>}
              <div className="mt-2 px-2 py-1 bg-red-200 rounded text-xs text-red-800 font-bold">
                🆘 EMERGENCY - {new Date(alert.created_at).toLocaleTimeString()}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default FunctionalMap;