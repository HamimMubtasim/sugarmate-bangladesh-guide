import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MacrosCardProps {
  carbs: { current: number; target: number; unit: string };
  protein: { current: number; target: number; unit: string };
  fat: { current: number; target: number; unit: string };
}

const MacrosCard: React.FC<MacrosCardProps> = ({ carbs, protein, fat }) => {
  const navigate = useNavigate();
  const getMacroProgress = (current: number, target: number) => 
    Math.min((current / target) * 100, 100);

  return (
    <div 
      onClick={() => navigate('/food-logs')}
      className="p-4 bg-white rounded-3xl shadow-lg border border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300"
    >
      <h3 className="text-base font-semibold text-gray-800 mb-4">Macros</h3>
      
      <div className="space-y-3">
        {/* Carbs */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-blue-600">CARBS</span>
            <span className="text-xs text-gray-600">{carbs.current}g</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${getMacroProgress(carbs.current, carbs.target)}%` }}
            />
          </div>
        </div>

        {/* Protein */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-green-600">PROTEIN</span>
            <span className="text-xs text-gray-600">{protein.current}g</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${getMacroProgress(protein.current, protein.target)}%` }}
            />
          </div>
        </div>

        {/* Fat */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-yellow-600">FAT</span>
            <span className="text-xs text-gray-600">{fat.current}g</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-yellow-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${getMacroProgress(fat.current, fat.target)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacrosCard;