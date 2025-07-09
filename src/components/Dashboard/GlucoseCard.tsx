
import React from 'react';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GlucoseCardProps {
  currentLevel: number;
  unit: 'mg/dL' | 'mmol/L';
  trend: 'up' | 'down' | 'stable';
  status: 'low' | 'normal' | 'high' | 'critical';
}

const GlucoseCard: React.FC<GlucoseCardProps> = ({ 
  currentLevel, 
  unit, 
  trend, 
  status 
}) => {
  const navigate = useNavigate();

  const getStatusColor = () => {
    switch (status) {
      case 'low': return 'glucose-low';
      case 'normal': return 'glucose-normal';
      case 'high': return 'glucose-high';
      case 'critical': return 'glucose-critical';
      default: return 'glucose-normal';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'low': return 'Low';
      case 'normal': return 'Normal';
      case 'high': return 'High';
      case 'critical': return 'Critical';
      default: return 'Normal';
    }
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Activity;

  return (
    <div 
      onClick={() => navigate('/glucose')}
      className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${getStatusColor()} shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white/20 rounded-2xl">
            <Activity size={24} className="text-gray-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Glucose Level</h3>
            <p className="text-sm text-gray-600">{getStatusText()}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <TrendIcon size={20} className="text-gray-600" />
        </div>
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className="text-4xl font-bold text-gray-800">{currentLevel}</span>
        <span className="text-lg text-gray-600">{unit}</span>
      </div>
      
      <p className="text-sm text-gray-600 mt-2">Tap to view detailed chart</p>
    </div>
  );
};

export default GlucoseCard;
