import React from 'react';
import { Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CaloriesCardProps {
  burned: number;
}

const CaloriesCard: React.FC<CaloriesCardProps> = ({ burned }) => {
  const navigate = useNavigate();
  const burnedProgress = Math.min((burned / 400) * 100, 100); // Assuming 400 kCal target

  return (
    <div className="aspect-square p-4 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full w-full"
    >
      <div className="flex items-center justify-between mb-2">
        <Flame size={16} className="text-primary" />
      </div>
      
      <div className="flex-1 flex flex-col justify-center min-h-0">
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-2xl font-bold text-gray-900 truncate">{burned}</span>
          <span className="text-xs text-gray-500 flex-shrink-0">kCal</span>
        </div>
        <span className="text-xs text-gray-500 mb-1 truncate">Burnt</span>
        
        <h3 className="text-base font-semibold text-primary mb-2 truncate">Calories</h3>
        
        {/* Progress bar */}
        <div className="min-h-0">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span className="truncate">Burnt</span>
            <span className="flex-shrink-0">1640 kCal</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${burnedProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriesCard;