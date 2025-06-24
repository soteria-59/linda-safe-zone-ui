
import React, { useState } from 'react';
import { Search, Shield, AlertTriangle, Phone, FileText, Users, Scale, Heart, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const InfoHub = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const infoSections = [
    {
      id: 'emergency-contacts',
      title: 'Emergency Contacts',
      icon: Phone,
      color: 'text-red-600',
      content: [
        {
          title: 'Emergency Services',
          items: [
            'Police Emergency: 999, 112',
            'Kenya Red Cross (Ambulance): +254 703 037000'
          ]
        },
        {
          title: 'Legal Assistance',
          items: [
            'Amnesty International Kenya: +254 20 4283000, +254 20 2185905',
            'Law Society of Kenya (LSK): 0800 720 434 (Toll-free)',
            'Kenya Human Rights Commission (KHRC): +254 20 2044545, +254 722 264497'
          ]
        },
        {
          title: 'Medical Support',
          items: [
            'Independent Medico-Legal Unit (IMLU): +254 20 2650644',
            'Medics for Kenya: +254 708 311740, +254 739 567483'
          ]
        }
      ]
    },
    {
      id: 'medical-emergency',
      title: 'Medical Emergency Contacts',
      icon: Heart,
      color: 'text-red-600',
      content: [
        {
          title: 'Immediate Medical Response',
          items: [
            'Kenya Red Cross (Ambulance): +254 703 037000',
            'Emergency Services: 999 or 112',
            'Independent Medico-Legal Unit (IMLU): +254 20 2650644 - Medical and legal documentation of violations',
            'Medics for Kenya: +254 708 311740, +254 739 567483 - Field medical support'
          ]
        }
      ]
    },
    {
      id: 'legal-rights',
      title: 'Know Your Rights',
      icon: Scale,
      color: 'text-blue-600',
      content: [
        {
          title: 'Constitutional Rights',
          items: [
            'Right to peaceful assembly (Article 37)',
            'Freedom of expression and opinion',
            'Right to participate in peaceful activities',
            'Protection from arbitrary arrest'
          ]
        },
        {
          title: 'During Arrest',
          items: [
            'You have the right to remain silent',
            'Ask for the officer\'s name and badge number',
            'Request to call a lawyer immediately',
            'You must appear in court within 24 hours',
            'Don\'t sign anything without legal representation'
          ]
        },
        {
          title: 'Police Interactions',
          items: [
            'Stay calm and respectful',
            'Keep your hands visible',
            'Don\'t resist even if you believe the arrest is unfair',
            'Remember officer details for later legal action',
            'Ask if you\'re free to leave'
          ]
        }
      ]
    },
    {
      id: 'safety-tips',
      title: 'Safety During Protests',
      icon: Shield,
      color: 'text-green-600',
      content: [
        {
          title: 'Before the Protest',
          items: [
            'Inform trusted contacts of your plans',
            'Charge your phone fully',
            'Wear comfortable, non-restrictive clothing',
            'Bring water and basic first aid',
            'Know the protest route and exit points'
          ]
        },
        {
          title: 'During the Protest',
          items: [
            'Stay with trusted friends or groups',
            'Follow organizer instructions',
            'Avoid confrontations with counter-protesters',
            'Stay hydrated and take breaks',
            'Be aware of your surroundings at all times'
          ]
        },
        {
          title: 'If Things Turn Violent',
          items: [
            'Move away from violence immediately',
            'Find the nearest safe zone',
            'Don\'t run unless absolutely necessary',
            'Cover nose and mouth if tear gas is used',
            'Help others while prioritizing your safety'
          ]
        }
      ]
    },
    {
      id: 'tear-gas',
      title: 'Tear Gas Response',
      icon: AlertTriangle,
      color: 'text-orange-600',
      content: [
        {
          title: 'Immediate Response',
          items: [
            'Stay calm and don\'t panic',
            'Move away from the source upwind if possible',
            'Cover nose and mouth with cloth',
            'Flush eyes with clean water or milk',
            'Don\'t rub your eyes or face'
          ]
        },
        {
          title: 'Treatment',
          items: [
            'Find fresh air immediately',
            'Remove contaminated clothing',
            'Rinse exposed skin with cold water',
            'Seek medical attention if symptoms persist',
            'Document exposure for potential legal action'
          ]
        }
      ]
    },
    {
      id: 'documentation',
      title: 'Documenting Violations',
      icon: FileText,
      color: 'text-purple-600',
      content: [
        {
          title: 'What to Document',
          items: [
            'Time and location of incidents',
            'Officer badge numbers and descriptions',
            'Photos/videos of violations (if safe)',
            'Witness contact information',
            'Medical treatment received'
          ]
        },
        {
          title: 'Reporting Channels',
          items: [
            'Kenya Human Rights Commission',
            'Independent Police Oversight Authority',
            'Amnesty International Kenya',
            'Local human rights organizations'
          ]
        }
      ]
    },
    {
      id: 'communication',
      title: 'Communication Safety',
      icon: Users,
      color: 'text-indigo-600',
      content: [
        {
          title: 'Digital Security',
          items: [
            'Use encrypted messaging apps',
            'Turn off location services when not needed',
            'Be cautious of public WiFi',
            'Clear browsing data regularly',
            'Use VPNs for additional privacy'
          ]
        },
        {
          title: 'Emergency Communication',
          items: [
            'Have backup communication methods',
            'Share location with trusted contacts',
            'Use code words for sensitive information',
            'Keep important numbers written down',
            'Know how to contact legal aid quickly'
          ]
        }
      ]
    }
  ];

  const filteredSections = infoSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.content.some(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.items.some(detail => detail.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Info Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Essential safety information, legal rights, and emergency contacts for protesters in Kenya.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search safety information..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-4 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Info Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredSections.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No information found
              </h3>
              <p className="text-gray-600">
                Try different keywords or browse all sections below.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredSections.map((section) => (
                <div key={section.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <section.icon className={`w-6 h-6 ${section.color}`} />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {section.title}
                      </h2>
                    </div>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {section.content.map((item, itemIndex) => (
                      <AccordionItem 
                        key={itemIndex} 
                        value={`${section.id}-${itemIndex}`}
                        className="border-0"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left">
                          <span className="font-semibold text-gray-900 pr-4">
                            {item.title}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <ul className="space-y-2">
                            {item.items.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start">
                                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-gray-700">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Informed, Stay Safe
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Knowledge is your first line of defense. Download this information for offline access.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/faq"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              More Questions? Check FAQ
            </a>
            
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Emergency Contacts
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoHub;
