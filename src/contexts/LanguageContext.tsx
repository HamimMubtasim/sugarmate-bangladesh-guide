
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'bn';
  setLanguage: (lang: 'en' | 'bn') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    glucose: 'Glucose',
    scanner: 'Scan Food',
    medicine: 'Medicine',
    profile: 'Profile',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    todaysOverview: "Today's Overview",
    glucoseLevel: 'Glucose Level',
    steps: 'Steps',
    aiCoach: 'Ask your AI Coach',
    
    // Glucose
    logGlucose: 'Log Glucose',
    currentLevel: 'Current Level',
    mgdl: 'mg/dL',
    mmoll: 'mmol/L',
    beforeMeal: 'Before Meal',
    afterMeal: 'After Meal',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    loading: 'Loading...',
    error: 'Error occurred',
  },
  bn: {
    // Navigation
    dashboard: 'ড্যাশবোর্ড',
    glucose: 'গ্লুকোজ',
    scanner: 'খাবার স্ক্যান',
    medicine: 'ওষুধ',
    profile: 'প্রোফাইল',
    
    // Dashboard
    welcomeBack: 'স্বাগতম',
    todaysOverview: 'আজকের সারসংক্ষেপ',
    glucoseLevel: 'গ্লুকোজের মাত্রা',
    steps: 'পদক্ষেপ',
    aiCoach: 'আপনার AI কোচকে জিজ্ঞাসা করুন',
    
    // Glucose
    logGlucose: 'গ্লুকোজ লগ করুন',
    currentLevel: 'বর্তমান মাত্রা',
    mgdl: 'মি.গ্রা./ডে.লি.',
    mmoll: 'মি.মোল/লি.',
    beforeMeal: 'খাওয়ার আগে',
    afterMeal: 'খাওয়ার পরে',
    
    // Common
    save: 'সংরক্ষণ করুন',
    cancel: 'বাতিল',
    loading: 'লোড হচ্ছে...',
    error: 'ত্রুটি ঘটেছে',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'bn'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
