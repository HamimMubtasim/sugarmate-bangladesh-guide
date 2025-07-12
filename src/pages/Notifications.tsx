import React from 'react';
import { ArrowLeft, Bell, Clock, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Layout/Header';

const Notifications = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Notifications"
        subtitle="Manage your alerts and reminders"
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
              <Bell size={24} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Notification Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <Clock size={20} className="text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">Medicine Reminders</p>
                  <p className="text-sm text-gray-600">Get notified when it's time for medication</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full flex items-center justify-end pr-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <AlertCircle size={20} className="text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">Glucose Alerts</p>
                  <p className="text-sm text-gray-600">Alerts for high/low glucose levels</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full flex items-center justify-end pr-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <Bell size={20} className="text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">Daily Reminders</p>
                  <p className="text-sm text-gray-600">Log glucose readings and meals</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-gray-200 rounded-full flex items-center justify-start pl-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Notifications</h3>
          
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-2xl border-l-4 border-blue-400">
              <p className="font-medium text-gray-800">Medication Reminder</p>
              <p className="text-sm text-gray-600">Time to take your Metformin - 2 hours ago</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-2xl border-l-4 border-green-400">
              <p className="font-medium text-gray-800">Glucose Reading</p>
              <p className="text-sm text-gray-600">Your glucose level is normal - 4 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;