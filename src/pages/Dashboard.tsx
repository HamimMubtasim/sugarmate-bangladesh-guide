
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header';
import BottomNavigation from '@/components/Layout/BottomNavigation';
import GlucoseCard from '@/components/Dashboard/GlucoseCard';
import StepsCard from '@/components/Dashboard/StepsCard';
import AICoachCard from '@/components/Dashboard/AICoachCard';
import CaloriesCard from '@/components/Dashboard/CaloriesCard';
import MacrosCard from '@/components/Dashboard/MacrosCard';
import WeightCard from '@/components/Dashboard/WeightCard';
import StreakCard from '@/components/Dashboard/StreakCard';
import QuickStatsGrid from '@/components/Dashboard/QuickStatsGrid';

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
    calories: {
      eaten: 366,
      burned: 342,
      remaining: 1284,
      target: 1650,
      goalProgress: 75,
    },
    macros: {
      carbs: { current: 14, target: 196, unit: 'g' },
      protein: { current: 112, target: 118, unit: 'g' },
      fat: { current: 29, target: 61, unit: 'g' },
    },
    weight: {
      current: 90,
      previous: 91.2,
      unit: 'kg',
      trend: 'down' as const,
      chartData: [92, 91.5, 91.8, 91.2, 90.8, 90.3, 90],
    },
    streak: {
      current: 0,
      type: 'Daily',
      isToday: false,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={`Hey, ${user?.name || 'Safayer'}!`}
        subtitle="Have a refreshing evening!"
      />
      
      <div className="px-6 pt-6 pb-24 space-y-6">
        {/* Daily Streak Card */}
        <StreakCard
          currentStreak={mockData.streak.current}
          streakType={mockData.streak.type}
          isToday={mockData.streak.isToday}
        />
        
        {/* AI Coach Card */}
        <AICoachCard />
        
        {/* Calories Card */}
        <CaloriesCard
          eaten={mockData.calories.eaten}
          burned={mockData.calories.burned}
          remaining={mockData.calories.remaining}
          target={mockData.calories.target}
          goalProgress={mockData.calories.goalProgress}
        />
        
        {/* Macros Card */}
        <MacrosCard
          carbs={mockData.macros.carbs}
          protein={mockData.macros.protein}
          fat={mockData.macros.fat}
        />
        
        {/* Health Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Glucose Chart */}
          <GlucoseCard
            currentLevel={mockData.glucose.currentLevel}
            unit={mockData.glucose.unit}
            trend={mockData.glucose.trend}
            status={mockData.glucose.status}
          />
          
          {/* Weight Chart */}
          <WeightCard
            currentWeight={mockData.weight.current}
            previousWeight={mockData.weight.previous}
            unit={mockData.weight.unit}
            trend={mockData.weight.trend}
            chartData={mockData.weight.chartData}
          />
        </div>
        
        {/* Steps Card */}
        <StepsCard
          currentSteps={mockData.steps.currentSteps}
          targetSteps={mockData.steps.targetSteps}
          caloriesBurned={mockData.steps.caloriesBurned}
        />
        
        {/* Quick Stats Grid */}
        <QuickStatsGrid />
        
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
