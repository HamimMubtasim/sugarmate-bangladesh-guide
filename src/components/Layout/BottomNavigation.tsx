
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Activity, Scan, User, Pill } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { icon: Home, label: t('dashboard'), path: '/dashboard' },
    { icon: Activity, label: t('glucose'), path: '/glucose' },
    { icon: Scan, label: t('scanner'), path: '/scanner', isCenter: true },
    { icon: Pill, label: t('medicine'), path: '/medicine' },
    { icon: User, label: t('profile'), path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 safe-area-bottom">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          if (item.isCenter) {
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-2xl shadow-lg transform transition-all duration-200 active:scale-95"
              >
                <Icon size={28} />
              </button>
            );
          }

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-gray-600'
              }`}
            >
              <Icon size={24} className={isActive ? 'text-primary' : ''} />
              <span className={`text-xs mt-1 font-medium ${isActive ? 'text-primary' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
