
import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { AlertTriangle, Shield } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

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
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [currentPosition, setCurrentPosition] = useState<L.LatLng | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Real safe zones locations in Nairobi (corrected coordinates)
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

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Get user location or default to Nairobi
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = new L.LatLng(position.coords.latitude, position.coords.longitude);
          setCurrentPosition(userPos);
          initializeMap(userPos);
        },
        () => {
          const defaultPos = new L.LatLng(-1.2921, 36.8219);
          setCurrentPosition(defaultPos);
          initializeMap(defaultPos);
        }
      );
    } else {
      const defaultPos = new L.LatLng(-1.2921, 36.8219);
      setCurrentPosition(defaultPos);
      initializeMap(defaultPos);
    }

    function initializeMap(center: L.LatLng) {
      if (!mapContainerRef.current) return;

      // Create map
      const map = L.map(mapContainerRef.current, {
        center: [center.lat, center.lng],
        zoom: 13,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        touchZoom: true
      });

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Create custom icons
      const currentLocationIcon = L.divIcon({
        className: 'current-location-icon',
        html: '<div style="width: 16px; height: 16px; background-color: #3b82f6; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3); animation: pulse 2s infinite;"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const safeZoneIcon = L.divIcon({
        className: 'safe-zone-icon',
        html: '<div style="width: 24px; height: 24px; background-color: #10b981; border: 2px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"><svg style="width: 12px; height: 12px; color: white;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const chaosIcon = L.divIcon({
        className: 'chaos-icon',
        html: '<div style="width: 24px; height: 24px; background-color: #ef4444; border: 2px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3); animation: pulse 2s infinite;"><svg style="width: 12px; height: 12px; color: white;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const panicIcon = L.divIcon({
        className: 'panic-icon',
        html: '<div style="width: 24px; height: 24px; background-color: #991b1b; border: 2px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3); animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;"><svg style="width: 12px; height: 12px; color: white;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      // Add current location marker
      L.marker([center.lat, center.lng], { icon: currentLocationIcon })
        .addTo(map)
        .bindPopup('<div style="text-align: center; padding: 8px; background-color: #3b82f6; color: white; border-radius: 4px; font-weight: bold;">📍 You are here</div>');

      // Click handler for report mode
      if (reportMode && onReportLocation) {
        map.on('click', (e) => {
          onReportLocation(e.latlng.lat, e.latlng.lng);
        });
      }

      mapRef.current = map;
      setIsMapReady(true);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers based on props
  useEffect(() => {
    if (!mapRef.current || !isMapReady) return;

    // Clear existing markers except current location
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker && layer.options.icon?.options?.className !== 'current-location-icon') {
        mapRef.current?.removeLayer(layer);
      }
    });

    // Add safe zones
    if (showSafeZones) {
      safeZones.forEach(zone => {
        const safeZoneIcon = L.divIcon({
          className: 'safe-zone-icon',
          html: '<div style="width: 24px; height: 24px; background-color: #10b981; border: 2px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"><svg style="width: 12px; height: 12px; color: white;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div>',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        L.marker([zone.lat, zone.lng], { icon: safeZoneIcon })
          .addTo(mapRef.current!)
          .bindPopup(`
            <div style="padding: 16px; min-width: 200px; border: 2px solid #10b981; border-radius: 8px;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <div style="width: 32px; height: 32px; background-color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <svg style="width: 16px; height: 16px; color: white;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                </div>
                <h3 style="font-weight: bold; color: #047857; font-size: 18px; margin: 0;">${zone.name}</h3>
              </div>
              <p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;">${zone.description}</p>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="padding: 4px 12px; background-color: #dcfce7; border-radius: 16px; font-size: 12px; color: #047857; font-weight: 600;">
                  ✅ ${zone.type}
                </div>
                <div style="font-size: 12px; color: #6b7280;">
                  Safe Haven
                </div>
              </div>
            </div>
          `);
      });
    }

    // Add chaos reports
    if (showChaosZones) {
      chaosReports.forEach(report => {
        const chaosIcon = L.divIcon({
          className: 'chaos-icon',
          html: '<div style="width: 24px; height: 24px; background-color: #ef4444; border: 2px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3); animation: pulse 2s infinite;"><svg style="width: 12px; height: 12px; color: white;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg></div>',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        L.marker([report.location_lat, report.location_lng], { icon: chaosIcon })
          .addTo(mapRef.current!)
          .bindPopup(`
            <div style="padding: 16px; min-width: 200px; border: 2px solid #ef4444; border-radius: 8px;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <div style="width: 32px; height: 32px; background-color: #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <svg style="width: 16px; height: 16px; color: white;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                </div>
                <h3 style="font-weight: bold; color: #b91c1c; font-size: 18px; margin: 0;">${report.danger_type}</h3>
              </div>
              ${report.description ? `<p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;">${report.description}</p>` : ''}
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="padding: 4px 12px; background-color: #fecaca; border-radius: 16px; font-size: 12px; color: #b91c1c; font-weight: 600;">
                  ⚠️ Danger Zone
                </div>
                <div style="font-size: 12px; color: #6b7280;">
                  ${new Date(report.created_at).toLocaleTimeString()}
                </div>
              </div>
              ${report.is_verified ? '<div style="margin-top: 8px; font-size: 12px; color: #059669;">✓ Verified Report</div>' : ''}
            </div>
          `);
      });
    }

    // Add panic alerts
    panicAlerts.forEach(alert => {
      const panicIcon = L.divIcon({
        className: 'panic-icon',
        html: '<div style="width: 24px; height: 24px; background-color: #991b1b; border: 2px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3); animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;"><svg style="width: 12px; height: 12px; color: white;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      L.marker([alert.location_lat, alert.location_lng], { icon: panicIcon })
        .addTo(mapRef.current!)
        .bindPopup(`
          <div style="padding: 16px; min-width: 200px; border: 2px solid #991b1b; border-radius: 8px;">
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <div style="width: 32px; height: 32px; background-color: #991b1b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <svg style="width: 16px; height: 16px; color: white;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              </div>
              <h3 style="font-weight: bold; color: #991b1b; font-size: 18px; margin: 0;">🚨 PANIC ALERT</h3>
            </div>
            ${alert.emergency_note ? `<p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;">${alert.emergency_note}</p>` : ''}
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="padding: 4px 12px; background-color: #fecaca; border-radius: 16px; font-size: 12px; color: #991b1b; font-weight: bold;">
                🆘 EMERGENCY
              </div>
              <div style="font-size: 12px; color: #6b7280;">
                ${new Date(alert.created_at).toLocaleTimeString()}
              </div>
            </div>
            <div style="margin-top: 8px; font-size: 12px; color: #dc2626; animation: pulse 2s infinite;">
              ⚡ Active Alert
            </div>
          </div>
        `);
    });
  }, [showSafeZones, showChaosZones, showPoliceBlocks, chaosReports, panicAlerts, isMapReady]);

  return (
    <div className="w-full h-full relative">
      <div 
        ref={mapContainerRef} 
        className="w-full h-full rounded-lg"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};

export default FunctionalMap;
