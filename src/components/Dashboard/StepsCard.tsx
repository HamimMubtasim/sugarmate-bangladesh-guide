
import React from 'react';
import { Footprints, Target } from 'lucide-react';

interface StepsCardProps {
  currentSteps: number;
  targetSteps: number;
  caloriesBurned: number;
}

const StepsCard: React.FC<StepsCardProps> = ({ 
  currentSteps, 
  targetSteps, 
  caloriesBurned 
}) => {
  const progress = (currentSteps / targetSteps) * 100;

  return (
    <div className="p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Footprints size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Steps Today</h3>
            <p className="text-sm text-gray-600">{caloriesBurned} calories burned</p>
          </div>
        </div>
        
        <div className="p-2 bg-gray-100 rounded-xl">
          <Target size={20} className="text-gray-600" />
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="text-3xl font-bold text-gray-800">{currentSteps.toLocaleString()}</span>
          <span className="text-lg text-gray-600">/ {targetSteps.toLocaleString()}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
      
      <p className="text-sm text-gray-600">
        {progress >= 100 ? '🎉 Goal achieved!' : `${Math.round(100 - progress)}% to goal`}
      </p>
    </div>
  );
};

export default StepsCard;
