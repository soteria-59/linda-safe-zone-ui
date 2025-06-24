
import React, { useState } from 'react';
import { AlertTriangle, Phone, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const PanicButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [emergencyNote, setEmergencyNote] = useState('');
  const { toast } = useToast();

  const handlePanicPress = () => {
    setShowModal(true);
  };

  const handleConfirmEmergency = () => {
    setIsPressed(true);
    setShowModal(false);
    
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        
        // Create emergency message
        const emergencyMessage = `🚨 EMERGENCY ALERT 🚨
Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}
Time: ${new Date().toLocaleString()}
${emergencyNote ? `Note: ${emergencyNote}` : ''}

Sent from Linda Safety App`;

        // Open WhatsApp with emergency message
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(emergencyMessage)}`;
        window.open(whatsappUrl, '_blank');
        
        console.log('Emergency alert triggered:', {
          location: { latitude, longitude },
          note: emergencyNote,
          timestamp: new Date()
        });
        
        toast({
          title: "Emergency Alert Sent",
          description: "WhatsApp opened with emergency message. Share with trusted contacts.",
          variant: "destructive"
        });
      });
    }
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsPressed(false);
      setEmergencyNote('');
    }, 3000);
  };

  return (
    <>
      {/* Panic Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handlePanicPress}
          className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-200 ${
            isPressed 
              ? 'bg-red-800 scale-110 animate-pulse' 
              : 'bg-red-600 hover:bg-red-700 hover:scale-105'
          }`}
        >
          {isPressed ? (
            <Phone className="w-8 h-8 text-white animate-pulse" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-white" />
          )}
        </Button>
        
        {/* Tooltip */}
        <div className="absolute -top-12 right-1/2 transform translate-x-1/2 bg-black text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          Emergency Alert
        </div>
      </div>

      {/* Emergency Confirmation Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Send Emergency Alert?
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              This will capture your location and open WhatsApp with an emergency message to share with trusted contacts.
            </p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Optional Note
              </label>
              <Textarea
                value={emergencyNote}
                onChange={(e) => setEmergencyNote(e.target.value)}
                placeholder="e.g., Police approaching, need immediate help..."
                rows={3}
              />
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={() => setShowModal(false)}
                variant="outline"
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              
              <Button
                onClick={handleConfirmEmergency}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Alert
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PanicButton;
