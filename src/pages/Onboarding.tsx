
import React, { useState } from 'react';
import { Shield, Phone, MessageSquare, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [step, setStep] = useState<'phone' | 'otp' | 'pseudonym'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [pseudonym, setPseudonym] = useState('');
  const navigate = useNavigate();

  const handlePhoneSubmit = () => {
    // Simulate OTP sending
    console.log(`Sending OTP to ${phoneNumber}`);
    setStep('otp');
  };

  const handleOtpSubmit = () => {
    console.log(`Verifying OTP: ${otp}`);
    // Generate random pseudonym
    const randomPseudonym = `User${Math.floor(Math.random() * 9999)}`;
    setPseudonym(randomPseudonym);
    setStep('pseudonym');
  };

  const handleComplete = () => {
    console.log(`Welcome ${pseudonym}!`);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Linda</h1>
        <p className="text-gray-600">Your safety companion for peaceful protests</p>
      </div>

      {/* Step Content */}
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-lg">
        {step === 'phone' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Phone className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-gray-900">Enter Phone Number</h2>
              <p className="text-sm text-gray-600 mt-2">We'll send you a verification code</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <Input
                type="tel"
                placeholder="+254 xxx xxx xxx"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-center text-lg"
              />
            </div>
            
            <Button 
              onClick={handlePhoneSubmit}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={phoneNumber.length < 10}
            >
              Send Code
            </Button>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <MessageSquare className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-gray-900">Enter Verification Code</h2>
              <p className="text-sm text-gray-600 mt-2">Code sent to {phoneNumber}</p>
            </div>
            
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <Button 
              onClick={handleOtpSubmit}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={otp.length < 6}
            >
              Verify Code
            </Button>
          </div>
        )}

        {step === 'pseudonym' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <User className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-gray-900">Your Anonymous Identity</h2>
              <p className="text-sm text-gray-600 mt-2">This protects your privacy</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-2">You'll be known as:</p>
              <p className="text-2xl font-bold text-green-700">{pseudonym}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Location sharing enabled</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Anonymous mode active</span>
              </div>
            </div>
            
            <Button 
              onClick={handleComplete}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Start Using Linda
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
