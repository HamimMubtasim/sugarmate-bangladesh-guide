
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronRight } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: 'male' as 'male' | 'female' | 'other',
    diabetesType: 'type2' as 'type1' | 'type2' | 'gestational',
    diagnosisYear: new Date().getFullYear(),
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        phone: formData.phone,
        age: parseInt(formData.age),
        gender: formData.gender,
        diabetesType: formData.diabetesType,
        diagnosisYear: formData.diagnosisYear,
      };
      
      login(userData);
      navigate('/dashboard');
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="+880 1X XXX XXXXX"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateFormData('age', e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="25"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateFormData('gender', e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Diabetes Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Type of Diabetes
              </label>
              <div className="space-y-3">
                {[
                  { value: 'type1', label: 'Type 1 Diabetes' },
                  { value: 'type2', label: 'Type 2 Diabetes' },
                  { value: 'gestational', label: 'Gestational Diabetes' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-4 border border-gray-300 rounded-2xl cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="diabetesType"
                      value={option.value}
                      checked={formData.diabetesType === option.value}
                      onChange={(e) => updateFormData('diabetesType', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                      formData.diabetesType === option.value 
                        ? 'bg-primary border-primary' 
                        : 'border-gray-300'
                    }`}>
                      {formData.diabetesType === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                      )}
                    </div>
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year of Diagnosis
              </label>
              <input
                type="number"
                value={formData.diagnosisYear}
                onChange={(e) => updateFormData('diagnosisYear', parseInt(e.target.value))}
                className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent"
                min="1950"
                max={new Date().getFullYear()}
              />
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">You're All Set!</h2>
            
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                Welcome to SugarMate! Your personalized diabetes management app is ready. 
                Track your glucose levels, scan food, and get AI-powered insights to help 
                manage your health better.
              </p>
              
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20">
                <p className="text-sm text-primary font-medium">
                  Remember: Always consult with your healthcare provider for medical decisions. 
                  This app is designed to complement, not replace, professional medical care.
                </p>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name && formData.phone && formData.age;
      case 2:
        return formData.diabetesType && formData.diagnosisYear;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>
      
      <div className="flex-1 p-6">
        <div className="max-w-md mx-auto">
          {/* Step Indicator */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500">Step {step} of 3</p>
          </div>
          
          {/* Step Content */}
          {renderStep()}
          
          {/* Navigation */}
          <div className="mt-8 flex justify-between items-center">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Back
              </button>
            )}
            
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="ml-auto flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all duration-200"
            >
              <span>{step === 3 ? 'Get Started' : 'Continue'}</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
