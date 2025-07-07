import React, { useState } from 'react';
import { Phone, MessageSquare, Globe, Github, Heart, Shield, AlertTriangle, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: ''
  });
  const { toast } = useToast();

  const emergencyContacts = [
    {
      organization: 'Police Emergency',
      numbers: ['999', '112'],
      type: 'emergency',
      icon: AlertTriangle
    },
    {
      organization: 'Kenya Red Cross (Ambulance)',
      numbers: ['+254 703 037000'],
      type: 'emergency',
      icon: Heart
    },
    {
      organization: 'Amnesty International Kenya',
      numbers: ['+254 20 4283000', '+254 20 2185905'],
      type: 'legal',
      icon: Shield
    },
    {
      organization: 'Law Society of Kenya (LSK)',
      numbers: ['0800 720 434'],
      description: 'Toll-free legal assistance',
      type: 'legal',
      icon: Shield
    },
    {
      organization: 'Kenya Human Rights Commission (KHRC)',
      numbers: ['+254 20 2044545', '+254 722 264497'],
      type: 'legal',
      icon: Shield
    },
    {
      organization: 'Independent Medico-Legal Unit (IMLU)',
      numbers: ['+254 20 2650644'],
      description: 'Medical and legal documentation of violations',
      type: 'medical',
      icon: Heart
    },
    {
      organization: 'Medics for Kenya',
      numbers: ['+254 708 311740', '+254 739 567483'],
      type: 'medical',
      icon: Heart
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email content
    const subject = encodeURIComponent(`Linda Contact Form - ${formData.category || 'General'}`);
    const body = encodeURIComponent(`
Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Category: ${formData.category || 'Not specified'}

Message:
${formData.message}

---
Sent from Linda Contact Form
    `);
    
    // Open email client
    window.location.href = `mailto:gfordevworks@gmail.com?subject=${subject}&body=${body}`;
    
    toast({
      title: 'Email Client Opened',
      description: 'Your default email client should open with the message pre-filled.',
    });
    
    // Reset form
    setFormData({ name: '', email: '', category: '', message: '' });
  };

  const getContactsByType = (type: string) => {
    return emergencyContacts.filter(contact => contact.type === type);
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Need Help? We're Here for You
          </h1>
          <p className="text-xl text-gray-600">
            Multiple ways to get support, report issues, or connect with trusted organizations.
          </p>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Emergency & Legal Contacts
            </h2>
            <p className="text-lg text-gray-600">
              Keep these numbers handy - they could save your life or freedom.
            </p>
          </div>

          {/* Emergency Contacts */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-red-600 mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Emergency Services
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {getContactsByType('emergency').map((contact, index) => (
                <div key={index} className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <contact.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {contact.organization}
                      </h4>
                      <div className="space-y-1">
                        {contact.numbers.map((number, numIndex) => (
                          <a
                            key={numIndex}
                            href={`tel:${number}`}
                            className="block text-red-600 font-mono text-lg hover:text-red-700"
                          >
                            {number}
                          </a>
                        ))}
                      </div>
                      {contact.description && (
                        <p className="text-sm text-gray-600 mt-2">
                          {contact.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Assistance */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-green-600 mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              Legal Assistance
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {getContactsByType('legal').map((contact, index) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <contact.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {contact.organization}
                      </h4>
                      <div className="space-y-1">
                        {contact.numbers.map((number, numIndex) => (
                          <a
                            key={numIndex}
                            href={`tel:${number}`}
                            className="block text-green-600 font-mono text-lg hover:text-green-700"
                          >
                            {number}
                          </a>
                        ))}
                      </div>
                      {contact.description && (
                        <p className="text-sm text-gray-600 mt-2">
                          {contact.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Support */}
          <div>
            <h3 className="text-2xl font-semibold text-purple-600 mb-6 flex items-center">
              <Heart className="w-6 h-6 mr-2" />
              Medical Support
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {getContactsByType('medical').map((contact, index) => (
                <div key={index} className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <contact.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {contact.organization}
                      </h4>
                      <div className="space-y-1">
                        {contact.numbers.map((number, numIndex) => (
                          <a
                            key={numIndex}
                            href={`tel:${number}`}
                            className="block text-purple-600 font-mono text-lg hover:text-purple-700"
                          >
                            {number}
                          </a>
                        ))}
                      </div>
                      {contact.description && (
                        <p className="text-sm text-gray-600 mt-2">
                          {contact.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg text-gray-600">
              Have questions, suggestions, or need technical support? We're here to help.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name (Optional)
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (Optional)
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="safety">Safety Concern</SelectItem>
                    <SelectItem value="suggestion">Feature Suggestion</SelectItem>
                    <SelectItem value="legal">Legal Question</SelectItem>
                    <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us how we can help..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Other Ways to Connect
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-6 shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                WhatsApp Group
              </h3>
              <p className="text-gray-600 mb-4">
                Join our community for real-time updates and support.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.open('https://wa.me/254731060641', '_blank')}
              >
                Join Group
              </Button>
            </div>

            <div className="text-center bg-white rounded-xl p-6 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Github className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Open Source
              </h3>
              <p className="text-gray-600 mb-4">
                Contribute to Linda's development on GitHub.
              </p>
              <Button variant="outline" className="w-full">
                Contribute
              </Button>
            </div>

            <div className="text-center bg-white rounded-xl p-6 shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Community Forum
              </h3>
              <p className="text-gray-600 mb-4">
                Discuss safety tips and share experiences.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.open('https://twitter.com', '_blank')}
              >
                Join Forum
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
