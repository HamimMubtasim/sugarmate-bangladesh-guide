import React from 'react';
import { Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CaloriesCardProps {
  eaten: number;
  burned: number;
  remaining: number;
  target: number;
  goalProgress: number;
}

const CaloriesCard: React.FC<CaloriesCardProps> = ({ 
  eaten, 
  burned, 
  remaining, 
  target,
  goalProgress 
}) => {
  const navigate = useNavigate();
  const radius = 60;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (goalProgress / 100) * circumference;

  return (
    <div 
      onClick={() => navigate('/food-logs')}
      className="p-4 bg-white rounded-3xl shadow-lg border border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-800">Calories</h3>
          <p className="text-xs text-gray-600">Tap to view logs</p>
        </div>
        <div className="p-2 bg-primary/10 rounded-xl">
          <Flame size={16} className="text-primary" />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative">
          <svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth} className="transform -rotate-90">
            <circle
              cx={radius + strokeWidth / 2}
              cy={radius + strokeWidth / 2}
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
            />
            <circle
              cx={radius + strokeWidth / 2}
              cy={radius + strokeWidth / 2}
              r={radius}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-gray-800">{eaten}</span>
            <span className="text-xs text-gray-600">of {target}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-600 mt-3">
        <span>Burned: {burned}</span>
        <span>Left: {remaining}</span>
      </div>
    </div>
  );
};

export default CaloriesCard;