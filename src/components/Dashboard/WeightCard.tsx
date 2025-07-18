import React from 'react';
import { Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WeightCardProps {
  currentWeight: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

const WeightCard: React.FC<WeightCardProps> = ({ 
  currentWeight, 
  unit, 
  trend
}) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/weight')}
      className="aspect-square p-4 bg-white rounded-3xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200 flex flex-col h-full w-full"
    >
      <div className="flex items-center justify-between mb-2">
        <Scale size={16} className="text-primary" />
        {trend === 'up' && <span className="text-xs text-red-500">↗ 0.3</span>}
        {trend === 'down' && <span className="text-xs text-green-500">↘ 0.3</span>}
      </div>
      
      <div className="flex-1 flex flex-col justify-center min-h-0">
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-2xl font-bold text-gray-900 truncate">{currentWeight}</span>
          <span className="text-xs text-gray-500 flex-shrink-0">{unit}</span>
        </div>
        
        <h3 className="text-base font-semibold text-primary mb-1 truncate">Weight</h3>
        <p className="text-xs text-gray-600 truncate">Today</p>
      </div>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          navigate('/weight');
        }}
        className="bg-primary text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-primary/90 transition-colors"
      >
        Update Changes
      </button>
    </div>
  );
};

export default WeightCard;