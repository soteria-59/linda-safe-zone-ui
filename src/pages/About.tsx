
import React from 'react';
import { Shield, Users, Globe, Github, Heart, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const mission = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Every feature is designed with protester safety and anonymity as the top priority.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by activists, for activists. The community shapes our development.'
    },
    {
      icon: Globe,
      title: 'Open & Transparent',
      description: 'Open source, transparent processes, and accountable to the community.'
    }
  ];

  const partners = [
    {
      name: 'Haki Africa',
      description: 'Leading human rights organization providing legal guidance and support.',
      role: 'Legal Advisory'
    },
    {
      name: 'Amnesty International Kenya',
      description: 'International human rights organization with local expertise.',
      role: 'Research & Documentation'
    },
    {
      name: 'Kenya Human Rights Commission',
      description: 'Premier human rights organization in Kenya.',
      role: 'Field Support'
    },
    {
      name: 'Law Society of Kenya',
      description: 'Professional body for lawyers providing legal framework guidance.',
      role: 'Legal Framework'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-red-50 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Linda
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Linda is a community-driven platform designed to enhance safety during peaceful protests in Kenya. 
            We believe in the right to peaceful assembly and the importance of keeping protesters safe.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To provide tools that empower peaceful protesters while maintaining their safety and anonymity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mission.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
          </div>
          
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="text-lg leading-relaxed mb-6">
              Linda was born from the recognition that peaceful protesters in Kenya needed better tools 
              to stay safe while exercising their constitutional rights. Named after Linda Wanjiku, 
              representing every ordinary Kenyan fighting for their rights, our platform bridges the 
              gap between digital safety and physical protests.
            </p>
            
            <p className="text-lg leading-relaxed mb-6">
              We recognized that existing communication channels weren't adequate for the fast-moving, 
              high-stakes environment of peaceful protests. Protesters needed real-time information 
              about safe zones, danger areas, and emergency resources - all while maintaining their anonymity.
            </p>
            
            <p className="text-lg leading-relaxed">
              Today, Linda serves as a vital safety tool for peaceful protesters across Kenya, 
              providing real-time situational awareness, emergency communication, and access to 
              legal resources - all while protecting user privacy and maintaining complete anonymity.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Partners
            </h2>
            <p className="text-xl text-gray-600">
              Working with leading human rights organizations to ensure credibility and effectiveness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {partner.name}
                      </h3>
                      <span className="ml-3 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {partner.role}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal & Privacy Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Legal & Privacy Commitment
            </h2>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Data Protection Act Compliance
                </h3>
                <p className="text-gray-600 mb-4">
                  We fully comply with Kenya's Data Protection Act, ensuring your personal 
                  information is protected and never shared without explicit consent.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• No personal data collection without consent</li>
                  <li>• Anonymous usage by default</li>
                  <li>• Data minimization principles</li>
                  <li>• User control over all data</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Transparency & Accountability
                </h3>
                <p className="text-gray-600 mb-4">
                  Our code is open source, our processes are transparent, and we're 
                  accountable to the communities we serve.
                </p>
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex items-center">
                    <Github className="w-4 h-4 mr-2" />
                    View Source Code
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Help us build better tools for peaceful protest and democratic participation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-50"
            >
              <Heart className="w-5 h-5 mr-2" />
              Contribute
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-green-600"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
