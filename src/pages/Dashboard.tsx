
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header';
import BottomNavigation from '@/components/Layout/BottomNavigation';
import GlucoseCard from '@/components/Dashboard/GlucoseCard';
import StepsCard from '@/components/Dashboard/StepsCard';
import AICoachCard from '@/components/Dashboard/AICoachCard';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  // Mock data - in real app, this would come from API/database
  const mockData = {
    glucose: {
      currentLevel: 120,
      unit: 'mg/dL' as const,
      trend: 'stable' as const,
      status: 'normal' as const,
    },
    steps: {
      currentSteps: 8547,
      targetSteps: 10000,
      caloriesBurned: 342,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={`${t('welcomeBack')}, ${user?.name || 'User'}!`}
        subtitle={t('todaysOverview')}
      />
      
      <div className="px-6 pt-6 pb-24 space-y-6">
        {/* Glucose Level Card */}
        <GlucoseCard
          currentLevel={mockData.glucose.currentLevel}
          unit={mockData.glucose.unit}
          trend={mockData.glucose.trend}
          status={mockData.glucose.status}
        />
        
        {/* Steps Card */}
        <StepsCard
          currentSteps={mockData.steps.currentSteps}
          targetSteps={mockData.steps.targetSteps}
          caloriesBurned={mockData.steps.caloriesBurned}
        />
        
        {/* AI Coach Card */}
        <AICoachCard />
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-2">Medications</h4>
            <p className="text-sm text-gray-600">2 due today</p>
          </div>
          
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-2">Reports</h4>
            <p className="text-sm text-gray-600">Generate PDF</p>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
