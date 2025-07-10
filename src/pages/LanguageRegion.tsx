import React from 'react';
import { ArrowLeft, Globe, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Layout/Header';

const LanguageRegion = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Language & Region"
        subtitle="Customize your location preferences"
        showNotifications={false}
        showSettings={false}
      />
      
      <div className="px-6 pt-6 pb-24 space-y-6">
        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center space-x-2 text-primary"
        >
          <ArrowLeft size={20} />
          <span>Back to Profile</span>
        </button>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Globe size={24} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Language Settings</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-6 bg-green-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">EN</span>
                </div>
                <span className="font-medium text-gray-800">English</span>
              </div>
              <div className="w-5 h-5 bg-primary rounded-full border-2 border-white shadow-sm"></div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-6 bg-red-600 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">বা</span>
                </div>
                <span className="font-medium text-gray-800">বাংলা (Bengali)</span>
              </div>
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-6 bg-orange-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">हि</span>
                </div>
                <span className="font-medium text-gray-800">हिन्दी (Hindi)</span>
              </div>
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <MapPin size={24} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Region Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Country</label>
              <div className="mt-1 p-4 bg-gray-50 rounded-2xl">
                <p className="text-gray-800">Bangladesh</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Time Zone</label>
              <div className="mt-1 p-4 bg-gray-50 rounded-2xl">
                <p className="text-gray-800">Bangladesh Standard Time (GMT+6)</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Units</label>
              <div className="mt-1 space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">Glucose Units</span>
                  <span className="text-gray-800 font-medium">mg/dL</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-700">Weight Units</span>
                  <span className="text-gray-800 font-medium">kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageRegion;