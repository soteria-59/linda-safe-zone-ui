
import React, { useState, useEffect } from 'react';
import { Layers, AlertTriangle, Shield, Navigation, MapPin, Search, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import FunctionalMap from '@/components/FunctionalMap';
import FloatingActionButtons from '@/components/FloatingActionButtons';

interface ChaosReport {
  id: string;
  location_lat: number;
  location_lng: number;
  danger_type: string;
  description: string | null;
  created_at: string;
  is_verified: boolean;
}

interface PanicAlert {
  id: string;
  location_lat: number;
  location_lng: number;
  emergency_note: string | null;
  created_at: string;
  is_active: boolean;
}

const LiveMap = () => {
  const [showSafeZones, setShowSafeZones] = useState(false);
  const [showChaosZones, setShowChaosZones] = useState(false);
  const [showPoliceBlocks, setShowPoliceBlocks] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chaosReports, setChaosReports] = useState<ChaosReport[]>([]);
  const [panicAlerts, setPanicAlerts] = useState<PanicAlert[]>([]);
  const [showRoute, setShowRoute] = useState(false);
  const [routeDestination, setRouteDestination] = useState<{ lat: number; lng: number } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Safe zones for routing
  const safeZones = [
    { lat: -1.2833, lng: 36.8167, name: "All Saints Cathedral" },
    { lat: -1.2921, lng: 36.8219, name: "Uhuru Park" },
  ];

  useEffect(() => {
    // Fetch existing chaos reports
    const fetchChaosReports = async () => {
      const { data, error } = await supabase
        .from('chaos_reports')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching chaos reports:', error);
      } else {
        setChaosReports(data || []);
      }
    };

    // Fetch existing panic alerts
    const fetchPanicAlerts = async () => {
      const { data, error } = await supabase
        .from('panic_alerts')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching panic alerts:', error);
      } else {
        setPanicAlerts(data || []);
      }
    };

    fetchChaosReports();
    fetchPanicAlerts();

    // Subscribe to real-time updates for chaos reports
    const chaosChannel = supabase
      .channel('chaos-reports-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chaos_reports'
        },
        (payload) => {
          setChaosReports(prev => [payload.new as ChaosReport, ...prev]);
        }
      )
      .subscribe();

    // Subscribe to real-time updates for panic alerts
    const panicChannel = supabase
      .channel('panic-alerts-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'panic_alerts'
        },
        (payload) => {
          setPanicAlerts(prev => [payload.new as PanicAlert, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(chaosChannel);
      supabase.removeChannel(panicChannel);
    };
  }, []);

  const handleNearestSafeArea = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          // Find nearest safe zone
          let nearestZone = safeZones[0];
          let minDistance = Math.sqrt(
            Math.pow(userLat - nearestZone.lat, 2) + 
            Math.pow(userLng - nearestZone.lng, 2)
          );
          
          safeZones.forEach(zone => {
            const distance = Math.sqrt(
              Math.pow(userLat - zone.lat, 2) + 
              Math.pow(userLng - zone.lng, 2)
            );
            if (distance < minDistance) {
              minDistance = distance;
              nearestZone = zone;
            }
          });
          
          setShowSafeZones(true);
          setShowRoute(true);
          setRouteDestination({ lat: nearestZone.lat, lng: nearestZone.lng });
          
          toast({
            title: "Route to " + nearestZone.name,
            description: "Showing route to nearest safe zone.",
          });
        },
        () => {
          // Fallback if location not available
          setShowSafeZones(true);
          setRouteDestination({ lat: safeZones[0].lat, lng: safeZones[0].lng });
          
          toast({
            title: "Safe Zones Highlighted",
            description: "Safe zones are now visible. Enable location for routing.",
          });
        }
      );
    } else {
      setShowSafeZones(true);
      toast({
        title: "Safe Zones Highlighted",
        description: "Safe zones are now visible on the map.",
      });
    }
  };

  const handleAlertClick = (report: ChaosReport) => {
    toast({
      title: `${report.danger_type}`,
      description: `Reported ${new Date(report.created_at).toLocaleTimeString()}`,
      variant: "destructive"
    });
  };

  const handlePanicClick = (alert: PanicAlert) => {
    toast({
      title: "PANIC ALERT",
      description: `Emergency at this location - ${new Date(alert.created_at).toLocaleTimeString()}`,
      variant: "destructive"
    });
  };

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
          <div className="flex items-center space-x-2">
            <Button
              variant={showSafeZones ? "default" : "outline"}
              size="sm"
              onClick={() => setShowSafeZones(!showSafeZones)}
              className={`${showSafeZones ? 'bg-green-600 hover:bg-green-700 ring-2 ring-green-300' : 'border-green-600 text-green-600 hover:bg-green-50'}`}
            >
              <Shield className="w-4 h-4 mr-1" />
              Safe Zones
            </Button>
            
            <Button
              variant={showChaosZones ? "destructive" : "outline"}
              size="sm"
              onClick={() => setShowChaosZones(!showChaosZones)}
              className={`${showChaosZones ? 'ring-2 ring-red-300' : 'border-red-600 text-red-600 hover:bg-red-50'}`}
            >
              <AlertTriangle className="w-4 h-4 mr-1" />
              Chaos Zones
            </Button>
            
            <Button
              variant={showPoliceBlocks ? "default" : "outline"}
              size="sm"
              onClick={() => setShowPoliceBlocks(!showPoliceBlocks)}
              className={`${showPoliceBlocks ? 'bg-blue-600 hover:bg-blue-700 ring-2 ring-blue-300' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}`}
            >
              <Shield className="w-4 h-4 mr-1" />
              Police Blocks
            </Button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[calc(100vh-180px)]">
        <FunctionalMap
          showSafeZones={showSafeZones}
          showChaosZones={showChaosZones}
          showPoliceBlocks={showPoliceBlocks}
          chaosReports={chaosReports}
          panicAlerts={panicAlerts}
          showRoute={showRoute}
          routeDestination={routeDestination}
        />
        
        {/* Floating Action Buttons */}
        <FloatingActionButtons onNearestSafeZone={handleNearestSafeArea} />

        {/* Mobile Legend - Sheet */}
        <div className="absolute top-6 right-6 z-20 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="bg-white">
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
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full mr-3 flex items-center justify-center">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                  <span>Police Blocks</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-red-800 rounded-full mr-3 flex items-center justify-center">
                    <AlertTriangle className="w-3 h-3 text-white" />
                  </div>
                  <span>Panic Alerts (Critical)</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Legend */}
        <div className="absolute top-6 right-6 bg-white rounded-lg shadow-lg p-4 z-20 hidden md:block">
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
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-600 rounded-full mr-2 flex items-center justify-center">
                <Shield className="w-2 h-2 text-white" />
              </div>
              <span>Police Blocks</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-800 rounded-full mr-2 flex items-center justify-center">
                <AlertTriangle className="w-2 h-2 text-white" />
              </div>
              <span>Panic Alerts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
