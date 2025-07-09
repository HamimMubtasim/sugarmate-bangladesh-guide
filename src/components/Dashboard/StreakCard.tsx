import React from 'react';
import { Calendar, Trophy } from 'lucide-react';

interface StreakCardProps {
  currentStreak: number;
  streakType: string;
  isToday: boolean;
}

const StreakCard: React.FC<StreakCardProps> = ({ 
  currentStreak, 
  streakType, 
  isToday 
}) => {
  return (
    <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Trophy size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">{streakType} streak</p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-800">{currentStreak}</span>
              <span className="text-sm text-gray-600">days</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar size={16} className="text-gray-500" />
          <div className={`w-3 h-3 rounded-full ${
            isToday ? 'bg-green-500' : 'bg-gray-300'
          }`} />
        </div>
      </div>
    </div>
  );
};

export default StreakCard;