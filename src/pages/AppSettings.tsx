import React from 'react';
import { ArrowLeft, Settings, Shield, Database, HelpCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Layout/Header';

const AppSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="App Settings"
        subtitle="Configure app preferences"
        showNotifications={false}
        showSettings={false}
      />
      
      <div className="px-6 pt-6 pb-24 space-y-6">
        <button 
          onClick={() => navigate(location.state?.from || '/profile')}
          className="flex items-center space-x-2 text-primary"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Settings size={24} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">General Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p className="font-medium text-gray-800">Dark Mode</p>
                <p className="text-sm text-gray-600">Use dark theme</p>
              </div>
              <div className="w-12 h-6 bg-gray-200 rounded-full flex items-center justify-start pl-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p className="font-medium text-gray-800">Biometric Login</p>
                <p className="text-sm text-gray-600">Use fingerprint or face ID</p>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full flex items-center justify-end pr-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p className="font-medium text-gray-800">Auto Sync</p>
                <p className="text-sm text-gray-600">Sync data automatically</p>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full flex items-center justify-end pr-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Shield size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Privacy Policy</p>
                <p className="text-sm text-gray-600">How we protect your data</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-xl">
                <Database size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Data Export</p>
                <p className="text-sm text-gray-600">Download your health data</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-xl">
                <HelpCircle size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Help & Support</p>
                <p className="text-sm text-gray-600">Get help using the app</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p><span className="font-medium">App Version:</span> 2.1.0</p>
            <p><span className="font-medium">Build:</span> 2024.12.15</p>
            <p><span className="font-medium">Last Updated:</span> December 15, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSettings;