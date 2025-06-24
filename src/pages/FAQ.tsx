import React, { useState } from 'react';
import { Search, Shield, Globe, Users, Smartphone, AlertTriangle, Book } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = [
    {
      category: 'Privacy & Security',
      icon: Shield,
      color: 'text-green-600',
      questions: [
        {
          question: 'Why is Linda free?',
          answer: 'Linda is funded by human rights organizations and donors who believe in supporting peaceful protest. We will never charge for basic safety features because everyone deserves access to these tools regardless of their economic situation.'
        },
        {
          question: 'Can the government track me through Linda?',
          answer: 'Linda is designed with anonymity as the top priority. We don\'t collect personal information, use anonymous pseudonyms, and employ encryption. However, always use additional privacy measures like VPNs when possible, and remember that your mobile carrier and government can still track your device location.'
        },
        {
          question: 'Is my location data stored?',
          answer: 'Your exact location is only used temporarily for map features and panic alerts. We don\'t store precise location histories. Only general area information (like "Nairobi CBD") might be retained for safety zone verification.'
        },
        {
          question: 'What information do you collect?',
          answer: 'We collect minimal data: anonymous pseudonym, general location for safety features, and chaos reports you submit. We never collect names, phone numbers, or other identifying information. All data is encrypted and can be deleted at any time.'
        }
      ]
    },
    {
      category: 'Safety Features',
      icon: AlertTriangle,
      color: 'text-red-600',
      questions: [
        {
          question: 'How verified are the safe zones and chaos reports?',
          answer: 'Reports go through community verification and are cross-checked with trusted sources like human rights organizations. Safe zones are verified by partner NGOs. Recent reports are marked with timestamps and verification status.'
        },
        {
          question: 'What happens when I press the panic button?',
          answer: 'The panic button sends an encrypted alert to nearby Linda users and can optionally open WhatsApp with a pre-written SOS message. It also marks your current location as needing assistance. The alert includes your approximate location but maintains your anonymity.'
        },
        {
          question: 'How accurate is the real-time information?',
          answer: 'Information accuracy depends on community reports and partner organization updates. We show timestamps for all reports and mark verification status. Always use your judgment and multiple information sources when making safety decisions.'
        },
        {
          question: 'Can I use Linda during internet shutdowns?',
          answer: 'Linda works offline for essential features like the Info Hub. Map data is cached when possible. The panic button can still compose WhatsApp messages for when connectivity returns. We\'re working on mesh networking features for future updates.'
        }
      ]
    },
    {
      category: 'Emergency Contacts',
      icon: AlertTriangle,
      color: 'text-red-600',
      questions: [
        {
          question: 'What emergency numbers should I know?',
          answer: `Emergency Services:
• Police Emergency: 999, 112
• Kenya Red Cross (Ambulance): +254 703 037000

Legal Assistance:
• Amnesty International Kenya: +254 20 4283000, +254 20 2185905
• Law Society of Kenya (LSK): 0800 720 434 (Toll-free)
• Kenya Human Rights Commission (KHRC): +254 20 2044545, +254 722 264497

Medical Support:
• Independent Medico-Legal Unit (IMLU): +254 20 2650644
• Medics for Kenya: +254 708 311740, +254 739 567483`
        },
        {
          question: 'Who should I contact for medical emergencies during protests?',
          answer: `Medical Emergency Contacts:
• Kenya Red Cross (Ambulance): +254 703 037000
• Independent Medico-Legal Unit (IMLU): +254 20 2650644 - Medical and legal documentation of violations
• Medics for Kenya: +254 708 311740, +254 739 567483 - Field medical support

Always call 999 or 112 for immediate emergency response.`
        }
      ]
    },
    {
      category: 'Technical Support',
      icon: Smartphone,
      color: 'text-blue-600',
      questions: [
        {
          question: 'What if I don\'t have internet during a protest?',
          answer: 'Key features work offline: the Info Hub with legal and safety information is cached locally. Location tracking works without internet. Panic button messages are queued and sent when connection returns. Map data is pre-cached for major protest areas.'
        },
        {
          question: 'Which devices and browsers are supported?',
          answer: 'Linda works on all modern smartphones and computers through web browsers. We support Chrome, Firefox, Safari, and Edge. The website is optimized for mobile use but works equally well on desktop computers.'
        },
        {
          question: 'How do I report bugs or suggest features?',
          answer: 'You can report issues through our contact page or GitHub repository. We actively monitor community feedback and prioritize safety-critical fixes. Feature suggestions from the community help shape our development roadmap.'
        },
        {
          question: 'Is there a mobile app?',
          answer: 'Currently Linda works as a web application that functions like an app on your phone. You can add it to your home screen for quick access. We\'re considering native mobile apps based on community feedback and usage patterns.'
        }
      ]
    },
    {
      category: 'Legal Information',
      icon: Book,
      color: 'text-purple-600',
      questions: [
        {
          question: 'Is using Linda legal in Kenya?',
          answer: 'Yes, using Linda is completely legal. It supports your constitutional right to peaceful assembly under Article 37. However, always follow local laws and regulations when participating in protests.'
        },
        {
          question: 'What are my rights during a protest?',
          answer: 'Under Kenya\'s Constitution, you have the right to peaceful assembly, freedom of expression, and protection from arbitrary arrest. You have the right to remain silent, legal representation, and to be treated humanely. See our Info Hub for detailed information.'
        },
        {
          question: 'What should I do if arrested?',
          answer: 'Remain calm, ask for the officer\'s details, request legal representation, and don\'t sign anything without a lawyer. You should appear in court within 24 hours. Contact the emergency legal numbers provided in our Info Hub immediately.'
        },
        {
          question: 'Can police confiscate my phone for using Linda?',
          answer: 'Police need a warrant to search your phone in most cases. Using Linda is legal, but you can clear your browsing data before protests if concerned. Know your rights regarding device searches and don\'t resist - address violations through legal channels later.'
        }
      ]
    }
  ];

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to common questions about Linda's features, safety, and usage.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-4 text-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600">
                Try different keywords or browse all categories below.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFAQs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <category.icon className={`w-6 h-6 ${category.color}`} />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {category.category}
                      </h2>
                    </div>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border-0"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left">
                          <span className="font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </div>
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
            Still have questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Can't find what you're looking for? Get in touch with our support team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              Contact Support
            </a>
            
            <a
              href="/info"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Book className="w-5 h-5 mr-2" />
              Browse Info Hub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
