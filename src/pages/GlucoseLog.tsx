
import React, { useState } from 'react';
import { Plus, Calendar, TrendingUp } from 'lucide-react';
import Header from '@/components/Layout/Header';
import BottomNavigation from '@/components/Layout/BottomNavigation';
import GlucoseStatus from './GlucoseStatus';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GlucoseLog = () => {
  const [view, setView] = useState<'daily' | 'weekly'>('daily');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data for charts
  const dailyData = [
    { time: '06:00', glucose: 110 },
    { time: '09:00', glucose: 140 },
    { time: '12:00', glucose: 120 },
    { time: '15:00', glucose: 135 },
    { time: '18:00', glucose: 115 },
    { time: '21:00', glucose: 125 },
  ];

  const weeklyData = [
    { day: 'Mon', glucose: 125 },
    { day: 'Tue', glucose: 130 },
    { day: 'Wed', glucose: 120 },
    { day: 'Thu', glucose: 135 },
    { day: 'Fri', glucose: 118 },
    { day: 'Sat', glucose: 128 },
    { day: 'Sun', glucose: 122 },
  ];

  const currentData = view === 'daily' ? dailyData : weeklyData;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Glucose Levels"
        subtitle="Track and monitor your blood sugar"
      />
      
      <div className="px-6 pt-6 pb-24 space-y-6">
        {/* Quick Stats */}
        <GlucoseStatus
          current={120}
          avgToday={125}
          target={110}
          unit="mg/dL"
        />

        {/* Chart Section */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Glucose Trends</h3>
            
            <div className="flex bg-gray-100 rounded-2xl p-1">
              <button
                onClick={() => setView('daily')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  view === 'daily' 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-gray-600'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setView('weekly')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  view === 'weekly' 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-gray-600'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey={view === 'daily' ? 'time' : 'day'} 
                  stroke="#666"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#666"
                  fontSize={12}
                  domain={['dataMin - 10', 'dataMax + 10']}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="glucose" 
                  stroke="#2BB9FF" 
                  strokeWidth={3}
                  dot={{ fill: '#2BB9FF', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#2BB9FF' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Readings */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Readings</h3>
            <Calendar size={20} className="text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {[
              { time: '21:00', value: 125, status: 'normal', context: 'After Dinner' },
              { time: '18:00', value: 115, status: 'normal', context: 'Before Dinner' },
              { time: '15:00', value: 135, status: 'high', context: 'Afternoon Snack' },
              { time: '12:00', value: 120, status: 'normal', context: 'After Lunch' },
            ].map((reading, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    reading.status === 'normal' ? 'bg-green-500' : 
                    reading.status === 'high' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-800">{reading.value} mg/dL</p>
                    <p className="text-sm text-gray-600">{reading.context}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{reading.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 transition-transform duration-200"
      >
        <Plus size={24} />
      </button>
      
      <BottomNavigation />
    </div>
  );
};

export default GlucoseLog;
