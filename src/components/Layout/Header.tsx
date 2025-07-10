
import React from 'react';
import { Settings, Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showSettings?: boolean;
  showNotifications?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  subtitle, 
  showSettings = true, 
  showNotifications = true 
}) => {
  return (
    <div className="blur-header sticky top-0 z-50 px-6 py-4 border-b border-gray-200/30">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {showNotifications && (
            <button 
              onClick={() => window.location.href = '/notifications'}
              className="p-2 rounded-xl bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200/80 transition-colors"
            >
              <Bell size={20} className="text-gray-700" />
            </button>
          )}
          {showSettings && (
            <button 
              onClick={() => window.location.href = '/app-settings'}
              className="p-2 rounded-xl bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200/80 transition-colors"
            >
              <Settings size={20} className="text-gray-700" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
