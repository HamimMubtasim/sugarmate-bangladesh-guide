import React from 'react';
import { Scale, TrendingUp, TrendingDown } from 'lucide-react';

interface WeightCardProps {
  currentWeight: number;
  previousWeight: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  chartData: number[];
}

const WeightCard: React.FC<WeightCardProps> = ({ 
  currentWeight, 
  previousWeight, 
  unit, 
  trend,
  chartData 
}) => {
  const weightChange = currentWeight - previousWeight;
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Scale;
  
  const maxValue = Math.max(...chartData);
  const minValue = Math.min(...chartData);
  const range = maxValue - minValue || 1;

  return (
    <div className="p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Scale size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Weight</h3>
            <p className="text-sm text-gray-600">
              {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} {unit} from last week
            </p>
          </div>
        </div>
        <TrendIcon size={20} className={`${
          trend === 'up' ? 'text-red-500' : 
          trend === 'down' ? 'text-green-500' : 
          'text-gray-500'
        }`} />
      </div>

      <div className="flex items-end justify-between mb-4">
        <div>
          <span className="text-3xl font-bold text-gray-800">{currentWeight}</span>
          <span className="text-lg text-gray-600 ml-1">{unit}</span>
        </div>
        <p className="text-sm text-gray-600">6:59 PM</p>
      </div>

      {/* Mini Chart */}
      <div className="h-16 flex items-end space-x-1">
        {chartData.map((value, index) => {
          const height = ((value - minValue) / range) * 100;
          return (
            <div
              key={index}
              className={`flex-1 rounded-t-sm ${
                index === chartData.length - 1 ? 'bg-red-500' : 'bg-gray-300'
              }`}
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WeightCard;