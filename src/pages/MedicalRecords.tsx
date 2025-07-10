import React from 'react';
import { ArrowLeft, FileText, Calendar, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Layout/Header';

const MedicalRecords = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Medical Records"
        subtitle="View your health history"
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
              <FileText size={24} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Diabetes Information</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Diabetes Type</label>
              <div className="mt-1 p-4 bg-gray-50 rounded-2xl">
                <p className="text-gray-800">Type 2 Diabetes</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Diagnosis Year</label>
              <div className="mt-1 p-4 bg-gray-50 rounded-2xl">
                <p className="text-gray-800">2018</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Healthcare Provider</label>
              <div className="mt-1 p-4 bg-gray-50 rounded-2xl">
                <p className="text-gray-800">Dr. Ahmed Rahman</p>
                <p className="text-sm text-gray-600">Dhaka Medical College Hospital</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <TrendingUp size={24} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Recent Records</h2>
          </div>
          
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">HbA1c Test</p>
                  <p className="text-sm text-gray-600">7.2% - Dec 15, 2024</p>
                </div>
                <span className="text-green-600 text-sm font-medium">Normal</span>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Blood Pressure</p>
                  <p className="text-sm text-gray-600">120/80 - Dec 10, 2024</p>
                </div>
                <span className="text-green-600 text-sm font-medium">Normal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;