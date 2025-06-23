
import React, { useState } from 'react';
import { ArrowLeft, MapPin, AlertTriangle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ReportChaos = () => {
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [dangerType, setDangerType] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const dangerTypes = [
    'Tear Gas',
    'Police Raid',
    'Arrests in Progress',
    'Violence/Fighting',
    'Roadblock',
    'Water Cannons',
    'Rubber Bullets',
    'Other'
  ];

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Simulate converting click position to lat/lng
    const lat = -1.2921 + (y / rect.height) * 0.1;
    const lng = 36.8219 + (x / rect.width) * 0.1;
    
    setSelectedLocation({ lat, lng });
  };

  const handleSubmit = () => {
    if (!selectedLocation || !dangerType) {
      toast({
        title: "Missing Information",
        description: "Please select a location and danger type",
        variant: "destructive"
      });
      return;
    }

    console.log('Chaos report:', {
      location: selectedLocation,
      type: dangerType,
      description,
      timestamp: new Date()
    });

    toast({
      title: "Report Submitted",
      description: "Thank you for keeping the community safe",
    });

    navigate('/map');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate('/map')} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Report Chaos</h1>
        <div className="w-9"></div>
      </header>

      <div className="p-4 space-y-6">
        {/* Map Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-3 flex items-center">
            <MapPin className="w-5 h-5 text-red-600 mr-2" />
            Select Location
          </h2>
          
          <div 
            className="h-48 bg-gradient-to-br from-green-100 to-gray-100 rounded-lg relative cursor-crosshair border-2 border-dashed border-gray-300"
            onClick={handleMapClick}
          >
            {/* Map background pattern */}
            <div className="absolute inset-0 opacity-20" 
                 style={{
                   backgroundImage: `
                     linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                   `,
                   backgroundSize: '20px 20px'
                 }}>
            </div>
            
            {selectedLocation && (
              <div 
                className="absolute w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: '50%',
                  top: '50%'
                }}
              >
                <AlertTriangle className="w-3 h-3 text-white" />
              </div>
            )}
            
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              {selectedLocation ? (
                <span className="bg-white px-3 py-1 rounded-full text-sm shadow">
                  Location Selected
                </span>
              ) : (
                <span className="bg-white px-3 py-1 rounded-full text-sm shadow">
                  Tap to select location
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Danger Type Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            Danger Type
          </h2>
          
          <Select value={dangerType} onValueChange={setDangerType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type of danger" />
            </SelectTrigger>
            <SelectContent>
              {dangerTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Optional Description */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-3">
            Additional Details (Optional)
          </h2>
          
          <Textarea
            placeholder="e.g., Heavy police presence near Kenyatta Avenue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg"
          disabled={!selectedLocation || !dangerType}
        >
          <Send className="w-5 h-5 mr-2" />
          Submit Report
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          Reports are verified by community members and trusted sources
        </p>
      </div>
    </div>
  );
};

export default ReportChaos;
