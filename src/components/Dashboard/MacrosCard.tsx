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
      className="aspect-square p-4 bg-white rounded-3xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200 flex flex-col"
    >
      <div className="flex items-center justify-between mb-2">
        <Apple size={16} className="text-primary" />
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-3xl font-bold text-gray-900">{totalGrams}</span>
          <span className="text-sm text-gray-500">g</span>
        </div>
        
        <h3 className="text-lg font-semibold text-primary mb-3">Nutrients</h3>
        
        {/* Macro progress bars */}
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span className="text-orange-500 font-medium">CARBS</span>
              <span>{carbs}g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${carbsPercentage}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span className="text-primary font-medium">PROTEIN</span>
              <span>{protein}g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${proteinPercentage}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span className="text-yellow-500 font-medium">FAT</span>
              <span>{fat}g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-yellow-500 h-1.5 rounded-full transition-all duration-300"
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