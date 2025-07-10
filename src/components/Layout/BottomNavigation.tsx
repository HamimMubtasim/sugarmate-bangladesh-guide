
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
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 safe-area-bottom">
      <div className="flex items-center justify-around px-6 py-3">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          if (item.isCenter) {
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg transform transition-all duration-200 active:scale-95 hover:shadow-xl"
              >
                <Icon size={24} />
              </button>
            );
          }

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all duration-200 min-w-[48px] ${
                isActive 
                  ? 'text-primary' 
                  : 'text-gray-500'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-primary' : ''} />
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-primary' : ''}`}>
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
