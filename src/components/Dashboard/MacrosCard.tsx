import React from 'react';
import { Apple } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MacrosCardProps {
  totalGrams: number;
  carbs: number;
  protein: number;
  fat: number;
}

const MacrosCard: React.FC<MacrosCardProps> = ({ totalGrams, carbs, protein, fat }) => {
  const navigate = useNavigate();
  
  const carbsPercentage = totalGrams > 0 ? (carbs / totalGrams) * 100 : 0;
  const proteinPercentage = totalGrams > 0 ? (protein / totalGrams) * 100 : 0;
  const fatPercentage = totalGrams > 0 ? (fat / totalGrams) * 100 : 0;

  return (
    <div 
      onClick={() => navigate('/food-logs')}
      className="aspect-square p-4 bg-white rounded-3xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200 flex flex-col h-full w-full"
    >
      <div className="flex items-center justify-between mb-2">
        <Apple size={16} className="text-primary" />
      </div>
      
      <div className="flex-1 flex flex-col justify-center min-h-0">
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-2xl font-bold text-gray-900 truncate">{totalGrams}</span>
          <span className="text-xs text-gray-500 flex-shrink-0">g</span>
        </div>
        
        <h3 className="text-base font-semibold text-primary mb-2 truncate">Nutrients</h3>
        
        {/* Macro progress bars */}
        <div className="space-y-1.5 min-h-0">
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-0.5">
              <span className="text-orange-500 font-medium truncate">CARBS</span>
              <span className="flex-shrink-0">{carbs}g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-orange-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${carbsPercentage}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-0.5">
              <span className="text-primary font-medium truncate">PROTEIN</span>
              <span className="flex-shrink-0">{protein}g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-primary h-1 rounded-full transition-all duration-300"
                style={{ width: `${proteinPercentage}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-0.5">
              <span className="text-yellow-500 font-medium truncate">FAT</span>
              <span className="flex-shrink-0">{fat}g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-yellow-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${fatPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacrosCard;