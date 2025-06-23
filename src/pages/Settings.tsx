
import React, { useState } from 'react';
import { ArrowLeft, User, Globe, MapPin, Bell, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [locationSharing, setLocationSharing] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "Your data has been cleared from this device",
    });
    navigate('/onboarding');
  };

  const settingsItems = [
    {
      icon: User,
      title: 'Anonymous Identity',
      subtitle: 'You\'re logged in as User8473',
      action: null,
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      title: 'Location Sharing',
      subtitle: 'Allow Linda to access your location for safety features',
      action: (
        <Switch
          checked={locationSharing}
          onCheckedChange={setLocationSharing}
        />
      ),
      color: 'text-green-600'
    },
    {
      icon: Bell,
      title: 'Push Notifications',
      subtitle: 'Receive safety alerts and community updates',
      action: (
        <Switch
          checked={pushNotifications}
          onCheckedChange={setPushNotifications}
        />
      ),
      color: 'text-orange-600'
    },
    {
      icon: Globe,
      title: 'Language',
      subtitle: 'English (Kenya)',
      action: <span className="text-gray-400 text-sm">Coming Soon</span>,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
        <div className="w-9"></div>
      </header>

      <div className="p-4">
        {/* User Info Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-red-600 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-900">Linda Safety</h2>
              <p className="text-sm text-gray-600">Protecting protesters since 2025</p>
            </div>
          </div>
        </div>

        {/* Settings List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          {settingsItems.map((item, index) => (
            <div key={index} className={`p-4 flex items-center space-x-3 ${index < settingsItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div className="p-2 bg-gray-100 rounded-lg">
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.subtitle}</p>
              </div>
              {item.action}
            </div>
          ))}
        </div>

        {/* App Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">About Linda</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Version 1.0.0</p>
            <p>Built for peaceful protesters in Kenya</p>
            <p>Your safety is our priority</p>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Privacy Protected</h4>
              <p className="text-sm text-blue-700">
                Your identity remains anonymous. Location data is only used for safety features and is not stored permanently.
              </p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <Button 
          onClick={handleLogout}
          variant="destructive"
          className="w-full"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout & Clear Data
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          This will remove all data from your device and require you to sign up again.
        </p>
      </div>
    </div>
  );
};

export default Settings;
