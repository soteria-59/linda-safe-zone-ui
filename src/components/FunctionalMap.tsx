
import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
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
  showRoute?: boolean;
  routeDestination?: { lat: number; lng: number };
}

const FunctionalMap: React.FC<FunctionalMapProps> = ({
  showSafeZones,
  showChaosZones,
  showPoliceBlocks,
  chaosReports,
  panicAlerts,
  onReportLocation,
  reportMode = false,
  showRoute = false,
  routeDestination
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const routingControlRef = useRef<any>(null);
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

    // Get user location with high accuracy
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = new L.LatLng(position.coords.latitude, position.coords.longitude);
          setCurrentPosition(userPos);
          initializeMap(userPos, true); // true = user location found
        },
        () => {
          const defaultPos = new L.LatLng(-1.2921, 36.8219);
          setCurrentPosition(defaultPos);
          initializeMap(defaultPos, false); // false = using default location
        },
        { 
          enableHighAccuracy: true, 
          timeout: 10000, 
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      const defaultPos = new L.LatLng(-1.2921, 36.8219);
      setCurrentPosition(defaultPos);
      initializeMap(defaultPos, false);
    }

    function initializeMap(center: L.LatLng, hasUserLocation: boolean) {
      if (!mapContainerRef.current) return;

      // Create map with Kenya bounds, zoom higher for exact location
      const map = L.map(mapContainerRef.current, {
        center: [center.lat, center.lng],
        zoom: hasUserLocation ? 16 : 13, // Higher zoom for exact location
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        touchZoom: true,
        maxBounds: [
          [5.0, 33.0], // Northeast: Northern Kenya/Ethiopia border
          [-5.0, 42.0] // Southwest: Southern Kenya/Tanzania border
        ],
        maxBoundsViscosity: 0.8
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

      // Add current location marker - always visible
      const userLocationMarker = L.marker([center.lat, center.lng], { 
        icon: currentLocationIcon,
        zIndexOffset: 1000 // Ensure it stays on top
      })
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

    // Clear existing markers except current location (keep user location visible)
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker && 
          layer.options.icon?.options?.className !== 'current-location-icon' &&
          layer.options.zIndexOffset !== 1000) {
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

    // Add police blocks (from roadblock chaos reports)
    if (showPoliceBlocks) {
      const roadblockReports = chaosReports.filter(report => 
        report.danger_type.toLowerCase().includes('roadblock') || 
        report.danger_type.toLowerCase().includes('police') ||
        report.danger_type.toLowerCase().includes('block')
      );
      
      roadblockReports.forEach(report => {
        const policeIcon = L.divIcon({
          className: 'police-icon',
          html: '<div style="width: 24px; height: 24px; background-color: #2563eb; border: 2px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"><svg style="width: 12px; height: 12px; color: white;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div>',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        L.marker([report.location_lat, report.location_lng], { icon: policeIcon })
          .addTo(mapRef.current!)
          .bindPopup(`
            <div style="padding: 16px; min-width: 200px; border: 2px solid #2563eb; border-radius: 8px;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <div style="width: 32px; height: 32px; background-color: #2563eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <svg style="width: 16px; height: 16px; color: white;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                </div>
                <h3 style="font-weight: bold; color: #1d4ed8; font-size: 18px; margin: 0;">🚔 ${report.danger_type}</h3>
              </div>
              ${report.description ? `<p style="font-size: 14px; color: #4b5563; margin-bottom: 8px;">${report.description}</p>` : ''}
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="padding: 4px 12px; background-color: #dbeafe; border-radius: 16px; font-size: 12px; color: #1d4ed8; font-weight: 600;">
                  🚧 Police Block
                </div>
                <div style="font-size: 12px; color: #6b7280;">
                  ${new Date(report.created_at).toLocaleTimeString()}
                </div>
              </div>
            </div>
          `);
      });
    }

    // Add chaos reports (excluding roadblocks since they show as police blocks)
    if (showChaosZones) {
      const nonRoadblockReports = chaosReports.filter(report => 
        !report.danger_type.toLowerCase().includes('roadblock') && 
        !report.danger_type.toLowerCase().includes('block')
      );
      
      nonRoadblockReports.forEach(report => {
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

  // Handle smart routing (avoiding chaos zones)
  useEffect(() => {
    if (!mapRef.current || !isMapReady || !showRoute || !routeDestination || !currentPosition) return;

    // Remove existing routing control
    if (routingControlRef.current) {
      mapRef.current.removeControl(routingControlRef.current);
    }

    // Create waypoints avoiding chaos zones and panic alerts
    const avoidPoints: L.LatLng[] = [];
    
    // Add chaos zones to avoid
    chaosReports.forEach(report => {
      avoidPoints.push(L.latLng(report.location_lat, report.location_lng));
    });
    
    // Add panic alerts to avoid
    panicAlerts.forEach(alert => {
      avoidPoints.push(L.latLng(alert.location_lat, alert.location_lng));
    });

    // Calculate safer route with avoidance
    routingControlRef.current = (L as any).Routing.control({
      waypoints: [
        L.latLng(currentPosition.lat, currentPosition.lng),
        L.latLng(routeDestination.lat, routeDestination.lng)
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      createMarker: () => null, // Don't create markers as we already have them
      lineOptions: {
        styles: [{ color: '#10b981', weight: 5, opacity: 0.9 }]
      },
      router: (L as any).Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: 'foot' // Walking routing for shortcuts
      })
    }).addTo(mapRef.current);

    // Add safety notification
    if (avoidPoints.length > 0) {
      L.popup()
        .setLatLng(L.latLng(
          (currentPosition.lat + routeDestination.lat) / 2,
          (currentPosition.lng + routeDestination.lng) / 2
        ))
        .setContent(`
          <div style="padding: 8px; text-align: center; background-color: #10b981; color: white; border-radius: 4px; font-weight: bold;">
            🛡️ Safe Route<br/>
            <small style="font-weight: normal;">Avoiding ${avoidPoints.length} danger zone(s)</small>
          </div>
        `)
        .openOn(mapRef.current);
    }

    return () => {
      if (routingControlRef.current && mapRef.current) {
        mapRef.current.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
    };
  }, [showRoute, routeDestination, currentPosition, isMapReady, chaosReports, panicAlerts]);

  return (
    <div className="w-full h-full relative">
      <div 
        ref={mapContainerRef} 
        className="w-full h-full rounded-lg"
        style={{ minHeight: '400px', zIndex: 1 }}
      />
    </div>
  );
};

export default FunctionalMap;
