import React, { useState } from 'react';
import { Scale, Plus, Calendar } from 'lucide-react';
import Header from '@/components/Layout/Header';
import BottomNavigation from '@/components/Layout/BottomNavigation';

const Weight = () => {
  const [showLogForm, setShowLogForm] = useState(false);
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data for the chart
  const weightData = [
    { date: '2024-01-01', weight: 92.0 },
    { date: '2024-01-08', weight: 91.5 },
    { date: '2024-01-15', weight: 91.8 },
    { date: '2024-01-22', weight: 91.2 },
    { date: '2024-01-29', weight: 90.8 },
    { date: '2024-02-05', weight: 90.3 },
    { date: '2024-02-12', weight: 90.0 },
  ];

  const currentWeight = weightData[weightData.length - 1].weight;
  const previousWeight = weightData[weightData.length - 2].weight;
  const weightChange = currentWeight - previousWeight;

  const handleLogWeight = () => {
    if (weight) {
      // Here you would normally save to database
      console.log('Logging weight:', { weight: parseFloat(weight), date });
      setWeight('');
      setShowLogForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Weight Tracking" />
      
      <div className="px-6 pt-6 pb-24 space-y-6">
        {/* Current Weight Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <Scale size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Current Weight</h2>
                <p className="text-sm text-gray-600">
                  {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg from last week
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowLogForm(true)}
              className="bg-primary text-white p-3 rounded-2xl hover:bg-primary/90 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          
          <div className="text-center">
            <span className="text-4xl font-bold text-gray-800">{currentWeight}</span>
            <span className="text-xl text-gray-600 ml-2">kg</span>
          </div>
        </div>

        {/* Weight Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Progress</h3>
          
          <div className="h-64 relative">
            <svg width="100%" height="100%" className="overflow-visible">
              {/* Chart lines and points would go here */}
              <text x="50%" y="50%" textAnchor="middle" className="text-gray-400 text-sm">
                Chart visualization coming soon
              </text>
            </svg>
          </div>
        </div>

        {/* Recent Entries */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Entries</h3>
          
          <div className="space-y-3">
            {weightData.slice(-5).reverse().map((entry, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                </div>
                <span className="font-semibold text-gray-800">{entry.weight} kg</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Log Weight Modal */}
      {showLogForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Log Weight</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter weight"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowLogForm(false)}
                className="flex-1 py-3 border border-gray-300 rounded-2xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogWeight}
                className="flex-1 py-3 bg-primary text-white rounded-2xl font-medium hover:bg-primary/90 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default Weight;