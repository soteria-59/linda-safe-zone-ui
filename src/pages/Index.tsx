
import React from 'react';
import { Shield, MapPin, AlertTriangle, Book, User, Map, Phone } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import UserCard from '../components/UserCard';
import MiniMapPreview from '../components/MiniMapPreview';
import PanicButton from '../components/PanicButton';
import InfoHubCard from '../components/InfoHubCard';
import ActivitySummary from '../components/ActivitySummary';
import BottomNavigation from '../components/BottomNavigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header with Logo */}
      <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-red-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Linda</span>
        </div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-20 space-y-4">
        <HeroBanner />
        <UserCard />
        <MiniMapPreview />
        <InfoHubCard />
        <ActivitySummary />
      </main>

      {/* Floating Panic Button */}
      <PanicButton />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
