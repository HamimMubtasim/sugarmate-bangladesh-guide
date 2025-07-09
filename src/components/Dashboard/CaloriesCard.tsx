import React from 'react';
import { Flame } from 'lucide-react';

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
  const radius = 80;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (goalProgress / 100) * circumference;

  return (
    <div className="p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Today's calories</h3>
          <p className="text-sm text-gray-600">Keep tracking to reach your goal</p>
        </div>
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Flame size={24} className="text-primary" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{eaten}</p>
              <p className="text-sm text-gray-600">Eaten</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{burned}</p>
              <p className="text-sm text-gray-600">Burned</p>
            </div>
          </div>
        </div>

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
            <span className="text-2xl font-bold text-gray-800">{remaining}</span>
            <span className="text-xs text-gray-600">Left</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriesCard;