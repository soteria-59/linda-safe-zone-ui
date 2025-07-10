
import React from 'react';
import { Shield, MapPin, AlertTriangle, Book, Users, Globe, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import FloatingActionButtons from '@/components/FloatingActionButtons';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Anonymous & Secure',
      description: 'Join without revealing your identity. Your safety is our priority.'
    },
    {
      icon: MapPin,
      title: 'Real-time Map',
      description: 'Live updates on safe zones and dangerous areas during protests.'
    },
    {
      icon: AlertTriangle,
      title: 'Instant Alerts',
      description: 'One-tap panic button to alert nearby community members.'
    },
    {
      icon: Book,
      title: 'Know Your Rights',
      description: 'Access legal information and safety tips offline.'
    }
  ];

  const partners = [
    'Haki Africa',
    'Amnesty International Kenya',
    'Kenya Human Rights Commission',
    'Law Society of Kenya'
  ];

  const handleWatchDemo = () => {
    window.open('https://www.youtube.com/watch?v=qz0f1yyf_eA&pp=ygUJanVuZSAyNXRo', '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-red-50 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Stay Safe During
              <span className="bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent"> Protests</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Linda is your anonymous safety companion for peaceful protests in Kenya. 
              Get real-time alerts, find safe zones, and access your rights information.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={() => navigate('/map')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Open Live Map
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/report')}
                className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-3 text-lg"
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                Report Chaos
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/info')}
                className="px-8 py-3 text-lg"
              >
                <Book className="w-5 h-5 mr-2" />
                Know Your Rights
              </Button>
            </div>

            {/* Demo Video Preview */}
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <iframe 
                  width="100%" 
                  height="450" 
                  src="https://www.youtube.com/embed/qz0f1yyf_eA" 
                  title="Linda Safety App Demo - June 25th Protests"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  className="aspect-video"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Your Safety
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every feature is designed with protester safety and anonymity in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Anonymous & Secure</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Real-time Updates</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">Free</div>
              <div className="text-gray-600">Always Free to Use</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted Partners
            </h2>
            <p className="text-gray-600">
              Working with leading human rights organizations in Kenya
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-700">
                  {partner}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Stay Safe?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of Kenyans using Linda to protest safely and peacefully.
          </p>
          
          <Button 
            size="lg" 
            onClick={() => navigate('/map')}
            className="bg-white text-green-600 hover:bg-gray-50 px-8 py-3 text-lg"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
      
      {/* Floating Action Buttons */}
      <FloatingActionButtons />
    </div>
  );
};

export default Home;
