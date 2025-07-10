import React from 'react';
import { Activity, TrendingUp } from 'lucide-react';

interface GlucoseStatusProps {
  current: number;
  avgToday: number;
  target: number;
  unit: string;
}

const GlucoseStatus: React.FC<GlucoseStatusProps> = ({ current, avgToday, target, unit }) => {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {/* Current Glucose */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-3xl border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <Activity size={16} className="text-blue-600" />
          <span className="text-xs font-medium text-blue-700">Current</span>
        </div>
        <div className="text-2xl font-bold text-blue-900">{current}</div>
        <div className="text-xs text-blue-600">{unit}</div>
      </div>

      {/* Average Today */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-3xl border border-green-200">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp size={16} className="text-green-600" />
          <span className="text-xs font-medium text-green-700">Avg Today</span>
        </div>
        <div className="text-2xl font-bold text-green-900">{avgToday}</div>
        <div className="text-xs text-green-600">{unit}</div>
      </div>

      {/* Target */}
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-3xl border border-yellow-200">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-4 h-4 rounded-full bg-yellow-600 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
          <span className="text-xs font-medium text-yellow-700">Target</span>
        </div>
        <div className="text-2xl font-bold text-yellow-900">{target}</div>
        <div className="text-xs text-yellow-600">{unit}</div>
      </div>
    </div>
  );
};

export default GlucoseStatus;