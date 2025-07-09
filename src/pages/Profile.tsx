
import React from 'react';
import { User, Settings, FileText, Bell, Globe, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Layout/Header';
import BottomNavigation from '@/components/Layout/BottomNavigation';

const Profile = () => {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: User, label: 'Personal Information', action: () => {} },
    { icon: FileText, label: 'Medical Records', action: () => {} },
    { icon: Bell, label: 'Notifications', action: () => {} },
    { icon: Globe, label: 'Language & Region', action: () => {} },
    { icon: Settings, label: 'App Settings', action: () => {} },
    { icon: LogOut, label: 'Sign Out', action: logout, danger: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Profile"
        subtitle="Manage your account and settings"
      />
      
      <div className="px-6 pt-6 pb-24 space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
              <User size={32} className="text-primary" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
              <p className="text-gray-600">{user?.phone}</p>
              <p className="text-sm text-primary mt-1">
                {user?.diabetesType?.replace(/(\w)(\w*)/g, (g, a, b) => a.toUpperCase() + b)} Diabetes
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{user?.age}</p>
              <p className="text-sm text-gray-600">Age</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">
                {user ? new Date().getFullYear() - user.diagnosisYear : 0}
              </p>
              <p className="text-sm text-gray-600">Years with Diabetes</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className={`w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors ${
                  item.danger ? 'hover:bg-red-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${
                    item.danger ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    <Icon 
                      size={20} 
                      className={item.danger ? 'text-red-600' : 'text-gray-600'} 
                    />
                  </div>
                  <span className={`font-medium ${
                    item.danger ? 'text-red-600' : 'text-gray-800'
                  }`}>
                    {item.label}
                  </span>
                </div>
                
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
              </button>
            );
          })}
        </div>

        {/* App Info */}
        <div className="text-center pt-4">
          <p className="text-sm text-gray-500">SugarMate v1.0.0</p>
          <p className="text-xs text-gray-400 mt-1">Made with ❤️ for Bangladesh</p>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
