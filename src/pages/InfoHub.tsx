
import React, { useState } from 'react';
import { ArrowLeft, Search, Shield, Heart, Book, ChevronRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useNavigate } from 'react-router-dom';

const InfoHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const infoSections = [
    {
      id: 'rights',
      title: 'Know Your Rights',
      icon: Shield,
      color: 'text-green-600',
      items: [
        {
          title: 'Right to Peaceful Assembly',
          content: `Under Article 37 of the Kenyan Constitution, you have the right to assemble, demonstrate, picket, and petition peacefully and unarmed. This right is protected by law.

Key Points:
• Demonstrations must be peaceful and unarmed
• No prior authorization required for peaceful assembly
• Police cannot arbitrarily disperse peaceful gatherings
• You can carry placards and banners with your message`
        },
        {
          title: 'What to Do if Stopped by Police',
          content: `Stay calm and follow these steps:

1. Remain polite and respectful
2. Ask "Am I free to go?" - if yes, leave calmly
3. You have the right to remain silent
4. Ask for the officer's name and badge number
5. Do not resist even if you believe the stop is unfair
6. Contact a lawyer as soon as possible

Remember: Anything you say can be used against you in court.`
        },
        {
          title: 'Right to Legal Representation',
          content: `You have the right to:

• Remain silent until you have a lawyer present
• Contact a lawyer immediately upon arrest
• Free legal aid if you cannot afford a lawyer
• Be informed of the charges against you
• Appear in court within 24 hours (or next working day)

Emergency Legal Contacts:
• Haki Africa: +254 xxx xxx xxx
• LSK Pro Bono: +254 xxx xxx xxx`
        }
      ]
    },
    {
      id: 'safety',
      title: 'Safety Tips',
      icon: Book,
      color: 'text-blue-600',
      items: [
        {
          title: 'Before the Protest',
          content: `Preparation is key:

• Inform someone you trust about your plans
• Charge your phone fully and bring a power bank
• Wear comfortable, closed shoes you can run in
• Dress in layers you can remove if needed
• Bring water and snacks
• Memorize important phone numbers
• Know the route and identify safe zones
• Bring ID but consider leaving valuables at home`
        },
        {
          title: 'During the Protest',
          content: `Stay safe in the crowd:

• Stay with friends - never go alone
• Be aware of your surroundings at all times
• Identify exit routes early
• Stay hydrated
• Avoid confrontations with counter-protesters
• If police arrive, remain calm and comply
• Move away from any violence immediately
• Keep your hands visible and empty`
        },
        {
          title: 'Dealing with Tear Gas',
          content: `If tear gas is deployed:

Immediate Actions:
• Cover your nose and mouth with a cloth
• Breathe slowly and steadily through your nose
• Don't rub your eyes - it makes it worse
• Move away from the gas calmly but quickly
• Find fresh air and higher ground if possible

Treatment:
• Flush eyes with clean water or saline
• Remove contaminated clothing
• Wash skin with soap and water
• Seek medical attention if effects persist`
        }
      ]
    },
    {
      id: 'first-aid',
      title: 'First Aid',
      icon: Heart,
      color: 'text-red-600',
      items: [
        {
          title: 'Basic First Aid for Injuries',
          content: `Common protest injuries and treatment:

Cuts and Scrapes:
• Clean hands before treating wound
• Apply direct pressure to stop bleeding
• Clean wound with water if available
• Cover with clean cloth or bandage

Bruises and Blunt Trauma:
• Apply ice or cold compress if available
• Elevate injured area if possible
• Seek medical attention for severe bruising
• Watch for signs of internal injury`
        },
        {
          title: 'Dealing with Crowd Crush',
          content: `If caught in a crowd surge:

• Don't fight the crowd - move with it
• Keep your arms up to protect your chest
• If you fall, get up quickly or curl in a ball
• Help others up if safely possible
• Move diagonally toward the edge of the crowd
• Stay calm and don't push back

Warning Signs:
• Crowd density makes movement difficult
• People lifted off their feet
• Panic or shouting increases`
        },
        {
          title: 'Emergency Contacts',
          content: `Keep these numbers handy:

Emergency Services:
• Police: 999 or 112
• Ambulance: 999 or 112
• Fire Department: 999

Medical Emergency:
• Kenyatta Hospital: +254 xx xxx xxxx
• Nairobi Hospital: +254 xx xxx xxxx

Legal Aid:
• Haki Africa: +254 xx xxx xxxx
• Law Society of Kenya: +254 xx xxx xxxx`
        }
      ]
    }
  ];

  const filteredSections = infoSections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => navigate('/')} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Info Hub</h1>
        <div className="flex items-center space-x-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
          <Download className="w-3 h-3" />
          <span>Offline</span>
        </div>
      </header>

      <div className="p-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search info hub..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Info Sections */}
        <div className="space-y-4">
          {filteredSections.map((section) => (
            <div key={section.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-100`}>
                    <section.icon className={`w-5 h-5 ${section.color}`} />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                </div>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                {section.items.map((item, index) => (
                  <AccordionItem key={index} value={`${section.id}-${index}`} className="border-0">
                    <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                      <span className="text-left font-medium text-gray-900">
                        {item.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="text-sm text-gray-700 whitespace-pre-line">
                        {item.content}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {searchQuery && filteredSections.length === 0 && (
          <div className="text-center py-8">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No results found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoHub;
