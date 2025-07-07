
import React, { useState, useEffect } from 'react';
import { Layers, AlertTriangle, Shield, Navigation, MapPin, Search, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const navigate = useNavigate();
  const { toast } = useToast();

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
    setShowSafeZones(true);
    setShowChaosZones(false);
    toast({
      title: "Safe Zones Highlighted",
      description: "Safe zones are now visible on the map. Head to the nearest one.",
    });
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
        {/* OpenStreetMap Implementation */}
        <div id="maps" className="w-full h-full">
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight={0} 
            marginWidth={0} 
            src="https://www.openstreetmap.org/export/embed.html?bbox=36.800,-1.300,36.850,-1.250&layer=mapnik"
            className="absolute inset-0"
          />
          
          {/* Current location overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
              You are here
            </div>
          </div>
          
          {/* Safe zones overlay - only show when enabled */}
          {showSafeZones && (
            <>
              <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                  All Saints Cathedral
                  <div className="text-xs opacity-75">Verified Safe Zone</div>
                </div>
              </div>
              
              <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 z-10">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                  Uhuru Park
                  <div className="text-xs opacity-75">Community Safe Zone</div>
                </div>
              </div>

              <div className="absolute top-1/3 right-1/2 transform translate-x-1/4 -translate-y-1/2 z-10">
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
          
          {/* Police blocks overlay - only show when enabled */}
          {showPoliceBlocks && (
            <>
              <div className="absolute top-1/6 left-2/3 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                  Police Checkpoint
                  <div className="text-xs opacity-75">Active Block</div>
                </div>
              </div>
              
              <div className="absolute bottom-1/3 left-1/4 transform -translate-x-1/2 translate-y-1/2 z-10">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                  Road Block
                  <div className="text-xs opacity-75">Traffic Control</div>
                </div>
              </div>
            </>
          )}
          
          {/* Real-time chaos zones - only show when enabled */}
          {showChaosZones && chaosReports.map((report, index) => (
            <div 
              key={report.id} 
              className={`absolute z-10 cursor-pointer`}
              style={{
                top: `${30 + (index * 15)}%`,
                right: `${20 + (index * 10)}%`
              }}
              onClick={() => handleAlertClick(report)}
            >
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse hover:scale-110 transition-transform">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                {report.danger_type}
                <div className="text-xs opacity-75">{new Date(report.created_at).toLocaleTimeString()}</div>
              </div>
            </div>
          ))}

          {/* Real-time panic alerts with waveform animation */}
          {panicAlerts.map((alert, index) => (
            <div 
              key={alert.id} 
              className="absolute z-10 cursor-pointer group"
              style={{
                top: `${40 + (index * 12)}%`,
                left: `${25 + (index * 8)}%`
              }}
              onClick={() => handlePanicClick(alert)}
            >
              {/* Waveform rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-red-400 rounded-full animate-ping opacity-30"></div>
                <div className="absolute w-12 h-12 border-2 border-red-500 rounded-full animate-ping opacity-50 animation-delay-75"></div>
                <div className="absolute w-8 h-8 border-2 border-red-600 rounded-full animate-ping opacity-70 animation-delay-150"></div>
              </div>
              
              {/* Main panic icon */}
              <div className="relative w-6 h-6 bg-red-800 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-white z-10">
                <AlertTriangle className="w-3 h-3 text-white" />
              </div>
              
              {/* Info tooltip - only show on hover */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-red-800 text-white px-3 py-2 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                <div className="font-semibold">PANIC ALERT</div>
                <div className="opacity-75">{new Date(alert.created_at).toLocaleTimeString()}</div>
                {alert.emergency_note && (
                  <div className="text-xs mt-1 opacity-90">{alert.emergency_note}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-20">
          {/* Nearest Safe Area */}
          <Button 
            className="bg-green-600 hover:bg-green-700 shadow-lg"
            onClick={handleNearestSafeArea}
          >
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
