
import React from 'react';
import { Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GlucoseCardProps {
  currentLevel: number;
  unit: 'mg/dL' | 'mmol/L';
  status: 'low' | 'normal' | 'high' | 'critical';
}

const GlucoseCard: React.FC<GlucoseCardProps> = ({ 
  currentLevel, 
  unit, 
  status 
}) => {
  const navigate = useNavigate();

  const getStatusText = () => {
    switch (status) {
      case 'low': return 'Low';
      case 'normal': return 'Normal';
      case 'high': return 'High';
      case 'critical': return 'Critical';
      default: return 'Normal';
    }
  };

  return (
    <div 
      onClick={() => navigate('/glucose-status')}
      className="aspect-square p-4 bg-white rounded-3xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200 flex flex-col h-full w-full"
    >
      <div className="flex items-center justify-between mb-2">
        <Activity size={16} className="text-primary" />
      </div>
      
      <div className="flex-1 flex flex-col justify-center min-h-0">
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-2xl font-bold text-gray-900 truncate">{currentLevel}</span>
          <span className="text-xs text-gray-500 flex-shrink-0">{unit}</span>
        </div>
        
        <h3 className="text-base font-semibold text-primary mb-1 truncate">Glucose</h3>
        <p className="text-xs text-gray-600 truncate">{getStatusText()}</p>
      </div>
      
      <p className="text-xs text-gray-400 mt-auto">Tap to View Details</p>
    </div>
  );
};

export default GlucoseCard;
