
import React, { useState } from 'react';
import { Shield, Users, Globe, Heart, Code, Target, ExternalLink, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const [showVideo, setShowVideo] = useState(false);

  const handleWatchDemo = () => {
    window.open('https://www.youtube.com/watch?v=qz0f1yyf_eA&pp=ygUJanVuZSAyNXRo', '_blank');
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section with Protest Background */}
      <section 
        className="relative bg-gray-900 py-24 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><rect width="1200" height="600" fill="%23374151"/><g filter="url(%23blur)" opacity="0.3"><circle cx="200" cy="150" r="50" fill="%23f3f4f6"/><circle cx="400" cy="200" r="30" fill="%23f3f4f6"/><circle cx="600" cy="180" r="40" fill="%23f3f4f6"/><circle cx="800" cy="160" r="35" fill="%23f3f4f6"/><circle cx="1000" cy="190" r="45" fill="%23f3f4f6"/><rect x="150" y="300" width="80" height="120" fill="%23f3f4f6"/><rect x="350" y="320" width="60" height="100" fill="%23f3f4f6"/><rect x="550" y="310" width="70" height="110" fill="%23f3f4f6"/><rect x="750" y="305" width="65" height="115" fill="%23f3f4f6"/><rect x="950" y="315" width="75" height="105" fill="%23f3f4f6"/></g></svg>')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About Linda
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              A safety-first platform designed to protect peaceful protesters through real-time information sharing, emergency alerts, and community-driven safety networks.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Story</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Linda was born from the urgent need to protect peaceful protesters in Kenya during a time when civic engagement carried unprecedented risks. As citizens took to the streets to exercise their constitutional right to peaceful assembly, they faced increasing dangers from unpredictable crowd dynamics, tear gas deployments, and rapidly changing security situations.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our platform emerged from the recognition that information saves lives. When protesters know where safe zones are located, when they can quickly alert others to emerging dangers, and when they have immediate access to legal and medical support, their safety increases exponentially. Linda transforms individual smartphones into nodes in a protective network that shields the entire community.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              While Linda was built with collective urgency by civic-minded developers and activists, a patriot developer Gabriel of Bytic Labs felt it wise to help prototype a tool that could truly shield Mkenya. But ultimately, Linda belongs to the people. Every feature has been designed with input from protesters, human rights organizations, and legal experts who understand the ground realities of exercising democratic rights in challenging environments.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, Linda stands as more than just an app—it's a testament to the power of technology in service of democracy, a digital manifestation of the principle that safety should never be a barrier to peaceful civic participation.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">See Linda in Action</h2>
          <p className="text-xl text-gray-600 mb-12">
            Watch how Linda helps keep protesters safe during demonstrations
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div 
              className="relative bg-gray-200 rounded-xl overflow-hidden cursor-pointer group shadow-2xl"
              onClick={handleWatchDemo}
            >
              {/* YouTube Thumbnail Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-30 transition-all duration-300 group-hover:scale-110">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">Linda Safety Demo</h3>
                  <p className="text-white text-sm opacity-90">Click to watch on YouTube</p>
                </div>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Our Mission</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Safety First</h3>
              <p className="text-gray-600">
                Providing real-time safety information and emergency response tools to protect peaceful protesters.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Driven</h3>
              <p className="text-gray-600">
                Ngao kwa Mkenya. The community shapes our development through shared experiences and collaborative safety networks.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Democratic Values</h3>
              <p className="text-gray-600">
                Supporting the fundamental right to peaceful assembly and freedom of expression in democratic societies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Our Values</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Human Rights Focus</h3>
                <p className="text-gray-600">
                  We believe in the fundamental human right to peaceful protest and work tirelessly to protect those exercising this right.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy by Design</h3>
                <p className="text-gray-600">
                  Privacy and anonymity are built into every feature. We collect minimal data and prioritize user safety over everything else.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Open Development</h3>
                <p className="text-gray-600">
                  Our development process is transparent and community-driven, with regular input from users and human rights organizations.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Impact Driven</h3>
                <p className="text-gray-600">
                  Every feature we build is measured against one question: Does this make protesters safer? If not, we don't build it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get Involved
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Linda grows stronger with community involvement. Here's how you can contribute to keeping protesters safe.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Report Issues</h3>
              <p className="text-gray-600 mb-4">
                Help us improve by reporting bugs or suggesting new safety features.
              </p>
              <Button variant="outline" className="w-full">
                <a href="mailto:gfordevworks@gmail.com" className="w-full">
                  Send Feedback
                </a>
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Join Community</h3>
              <p className="text-gray-600 mb-4">
                Connect with other users and stay updated on safety developments.
              </p>
              <Button variant="outline" className="w-full">
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-full">
                  Join Forum
                </a>
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Contribute</h3>
              <p className="text-gray-600 mb-4">
                Support Linda's mission through donations or volunteer work.
              </p>
              <Button variant="outline" className="w-full">
                <a href="mailto:gfordevworks@gmail.com" className="w-full">
                  Get Involved
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
