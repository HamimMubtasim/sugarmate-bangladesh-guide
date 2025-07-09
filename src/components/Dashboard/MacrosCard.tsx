import React from 'react';

interface MacrosCardProps {
  carbs: { current: number; target: number; unit: string };
  protein: { current: number; target: number; unit: string };
  fat: { current: number; target: number; unit: string };
}

const MacrosCard: React.FC<MacrosCardProps> = ({ carbs, protein, fat }) => {
  const getMacroProgress = (current: number, target: number) => 
    Math.min((current / target) * 100, 100);

  return (
    <div className="p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Macronutrients</h3>
      
      <div className="space-y-6">
        {/* Carbs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">CARBS</span>
            <span className="text-sm text-gray-600">{carbs.current}/{carbs.target}{carbs.unit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getMacroProgress(carbs.current, carbs.target)}%` }}
            />
          </div>
        </div>

        {/* Protein */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">PROTEIN</span>
            <span className="text-sm text-gray-600">{protein.current}/{protein.target}{protein.unit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getMacroProgress(protein.current, protein.target)}%` }}
            />
          </div>
        </div>

        {/* Fat */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">FAT</span>
            <span className="text-sm text-gray-600">{fat.current}/{fat.target}{fat.unit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getMacroProgress(fat.current, fat.target)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacrosCard;