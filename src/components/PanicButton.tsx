
import React, { useState } from 'react';
import { AlertTriangle, Phone, X, Send, MessageCircle, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const PanicButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [emergencyNote, setEmergencyNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handlePanicPress = () => {
    setShowModal(true);
  };

  const submitPanicAlert = async (location: { latitude: number; longitude: number }) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('panic_alerts')
        .insert([
          {
            location_lat: location.latitude,
            location_lng: location.longitude,
            emergency_note: emergencyNote || null,
          }
        ]);

      if (error) {
        console.error('Error submitting panic alert:', error);
        toast({
          title: "Alert Failed",
          description: "Unable to submit panic alert to the map. Alert still sent via selected method.",
          variant: "destructive"
        });
      } else {
        console.log('Panic alert submitted to map:', {
          location,
          note: emergencyNote,
          timestamp: new Date()
        });
      }
    } catch (error) {
      console.error('Error submitting panic alert:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmergencyAction = (platform: 'whatsapp' | 'twitter' | 'call') => {
    setIsPressed(true);
    setShowModal(false);
    
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Submit panic alert to database for map display
        await submitPanicAlert({ latitude, longitude });
        
        // Create emergency message
        const emergencyMessage = `🚨 EMERGENCY ALERT 🚨
Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}
Time: ${new Date().toLocaleString()}
${emergencyNote ? `Note: ${emergencyNote}` : ''}

Sent from Linda Safety App`;

        switch (platform) {
          case 'whatsapp':
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(emergencyMessage)}`;
            window.open(whatsappUrl, '_blank');
            toast({
              title: "WhatsApp Alert Opened",
              description: "Share the emergency message with trusted contacts. Panic alert is now live on the map.",
              variant: "destructive"
            });
            break;
            
          case 'twitter':
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(emergencyMessage)}`;
            window.open(twitterUrl, '_blank');
            toast({
              title: "Twitter Alert Opened",
              description: "Share the emergency alert on Twitter. Panic alert is now live on the map.",
              variant: "destructive"
            });
            break;
            
          case 'call':
            // Access user's emergency contacts from phone
            if ('contacts' in navigator && 'select' in (navigator as any).contacts) {
              try {
                const contacts = await (navigator as any).contacts.select(['name', 'tel'], { multiple: true });
                if (contacts && contacts.length > 0) {
                  // Use first contact's phone number
                  const phoneNumber = contacts[0].tel[0];
                  window.location.href = `tel:${phoneNumber}`;
                  toast({
                    title: "Emergency Call Initiated",
                    description: "Calling your emergency contact. Panic alert is now live on the map.",
                    variant: "destructive"
                  });
                } else {
                  // Fallback to emergency services
                  window.location.href = 'tel:999';
                  toast({
                    title: "Emergency Call Initiated",
                    description: "Calling emergency services (999). Panic alert is now live on the map.",
                    variant: "destructive"
                  });
                }
              } catch (error) {
                // Fallback to emergency services
                window.location.href = 'tel:999';
                toast({
                  title: "Emergency Call Initiated",
                  description: "Calling emergency services (999). Panic alert is now live on the map.",
                  variant: "destructive"
                });
              }
            } else {
              // Fallback to emergency services
              window.location.href = 'tel:999';
              toast({
                title: "Emergency Call Initiated",
                description: "Calling emergency services (999). Panic alert is now live on the map.",
                variant: "destructive"
              });
            }
            break;
        }
        
        console.log('Emergency alert triggered:', {
          platform,
          location: { latitude, longitude },
          note: emergencyNote,
          timestamp: new Date()
        });
      });
    } else {
      // Fallback without location - still submit alert with default coordinates
      const defaultLocation = { latitude: -1.2921, longitude: 36.8219 }; // Nairobi center
      submitPanicAlert(defaultLocation);
      
      const emergencyMessage = `🚨 EMERGENCY ALERT 🚨
Time: ${new Date().toLocaleString()}
${emergencyNote ? `Note: ${emergencyNote}` : ''}

Sent from Linda Safety App`;

      switch (platform) {
        case 'whatsapp':
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(emergencyMessage)}`;
          window.open(whatsappUrl, '_blank');
          toast({
            title: "WhatsApp Alert Opened",
            description: "Share the emergency message with trusted contacts. Panic alert is now live on the map.",
            variant: "destructive"
          });
          break;
        case 'twitter':
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(emergencyMessage)}`;
          window.open(twitterUrl, '_blank');
          toast({
            title: "Twitter Alert Opened", 
            description: "Share the emergency alert on Twitter. Panic alert is now live on the map.",
            variant: "destructive"
          });
          break;
        case 'call':
          window.location.href = 'tel:999';
          toast({
            title: "Emergency Call Initiated",
            description: "Calling emergency services (999). Panic alert is now live on the map.",
            variant: "destructive"
          });
          break;
      }
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
      <div className="fixed bottom-24 right-6 z-50">
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
          
          <div className="space-y-6">
            <p className="text-gray-600">
              Choose how you want to send your emergency alert. Your location will be included automatically and shown as a critical alert on the map.
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
            
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Choose Alert Method:
              </div>
              
              <Button
                onClick={() => handleEmergencyAction('whatsapp')}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={isSubmitting}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Send via WhatsApp
              </Button>
              
              <Button
                onClick={() => handleEmergencyAction('twitter')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                disabled={isSubmitting}
              >
                <Twitter className="w-4 h-4 mr-2" />
                Post on Twitter/X
              </Button>
              
              <Button
                onClick={() => handleEmergencyAction('call')}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={isSubmitting}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Emergency Contacts
              </Button>
            </div>
            
            <Button
              onClick={() => setShowModal(false)}
              variant="outline"
              className="w-full"
              disabled={isSubmitting}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PanicButton;
