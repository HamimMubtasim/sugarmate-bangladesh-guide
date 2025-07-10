import React from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Layout/Header';

const PersonalInformation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Personal Information"
        subtitle="Manage your personal details"
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
              <User size={24} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <div className="mt-1 p-4 bg-gray-50 rounded-2xl">
                <p className="text-gray-800">Safayer Rahman</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Age</label>
                <div className="mt-1 p-4 bg-gray-50 rounded-2xl">
                  <p className="text-gray-800">32</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Gender</label>
                <div className="mt-1 p-4 bg-gray-50 rounded-2xl">
                  <p className="text-gray-800">Male</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <div className="mt-1 p-4 bg-gray-50 rounded-2xl">
                <p className="text-gray-800">+880 123 456 789</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
              <div className="mt-1 p-4 bg-gray-50 rounded-2xl">
                <p className="text-gray-800">+880 987 654 321</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;