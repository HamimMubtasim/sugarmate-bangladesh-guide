import React from 'react';
import { Heart, Droplet, Activity, Target } from 'lucide-react';

interface StatItem {
  icon: React.ElementType;
  label: string;
  value: string;
  unit?: string;
  color: string;
}

const QuickStatsGrid: React.FC = () => {
  const stats: StatItem[] = [
    {
      icon: Heart,
      label: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      color: 'text-red-500'
    },
    {
      icon: Droplet,
      label: 'Hydration',
      value: '6',
      unit: 'glasses',
      color: 'text-blue-500'
    },
    {
      icon: Activity,
      label: 'Sleep',
      value: '7.5',
      unit: 'hours',
      color: 'text-purple-500'
    },
    {
      icon: Target,
      label: 'Goals',
      value: '3/5',
      color: 'text-green-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-xl bg-gray-50`}>
                <Icon size={20} className={stat.color} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <div className="flex items-baseline space-x-1">
                  <span className="text-lg font-bold text-gray-800">{stat.value}</span>
                  {stat.unit && (
                    <span className="text-xs text-gray-500">{stat.unit}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStatsGrid;