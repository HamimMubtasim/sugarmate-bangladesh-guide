import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header';
import BottomNavigation from '@/components/Layout/BottomNavigation';
import { 
  Plus, 
  Pill, 
  Clock, 
  Camera, 
  Bell,
  Package,
  AlertTriangle,
  Calendar,
  Edit,
  Trash2
} from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  type: string;
  currentStock: number;
  lowStockThreshold: number;
  expiryDate: string;
  schedules: MedicineSchedule[];
}

interface MedicineSchedule {
  id: string;
  timeOfDay: string;
  daysOfWeek: number[];
  isActive: boolean;
  reminderEnabled: boolean;
}

const Medicine = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'medicines' | 'schedules' | 'scanner'>('medicines');
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: '1',
      name: 'Metformin',
      dosage: '500mg',
      type: 'Tablet',
      currentStock: 20,
      lowStockThreshold: 5,
      expiryDate: '2024-12-31',
      schedules: [
        {
          id: '1',
          timeOfDay: '08:00',
          daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
          isActive: true,
          reminderEnabled: true
        },
        {
          id: '2',
          timeOfDay: '20:00',
          daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
          isActive: true,
          reminderEnabled: true
        }
      ]
    }
  ]);

  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dosage: '',
    type: 'Tablet',
    currentStock: 0,
    lowStockThreshold: 5,
    expiryDate: ''
  });

  const addMedicine = () => {
    const medicine: Medicine = {
      id: Date.now().toString(),
      ...newMedicine,
      schedules: []
    };
    setMedicines([...medicines, medicine]);
    setNewMedicine({
      name: '',
      dosage: '',
      type: 'Tablet',
      currentStock: 0,
      lowStockThreshold: 5,
      expiryDate: ''
    });
    setShowAddMedicine(false);
  };

  const isLowStock = (medicine: Medicine) => {
    return medicine.currentStock <= medicine.lowStockThreshold;
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntilExpiry <= 30;
  };

  const renderMedicinesTab = () => (
    <div className="space-y-4">
      {/* Add Medicine Button */}
      <button
        onClick={() => setShowAddMedicine(true)}
        className="w-full p-4 bg-primary text-white rounded-2xl flex items-center justify-center space-x-2 shadow-lg"
      >
        <Plus size={20} />
        <span className="font-semibold">Add Medicine</span>
      </button>

      {/* Medicines List */}
      {medicines.map((medicine) => (
        <div key={medicine.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Pill className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{medicine.name}</h3>
                <p className="text-sm text-gray-600">{medicine.dosage} • {medicine.type}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-primary">
                <Edit size={16} />
              </button>
              <button className="p-2 text-gray-500 hover:text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-1 ${isLowStock(medicine) ? 'text-red-500' : 'text-gray-600'}`}>
                <Package size={14} />
                <span>Stock: {medicine.currentStock}</span>
                {isLowStock(medicine) && <AlertTriangle size={14} />}
              </div>
              <div className={`flex items-center space-x-1 ${isExpiringSoon(medicine.expiryDate) ? 'text-orange-500' : 'text-gray-600'}`}>
                <Calendar size={14} />
                <span>Exp: {medicine.expiryDate}</span>
                {isExpiringSoon(medicine.expiryDate) && <AlertTriangle size={14} />}
              </div>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock size={14} />
              <span>{medicine.schedules.length} schedules</span>
            </div>
          </div>

          {medicine.schedules.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {medicine.schedules.map((schedule) => (
                  <div key={schedule.id} className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-lg text-xs">
                    <Clock size={12} />
                    <span>{schedule.timeOfDay}</span>
                    {schedule.reminderEnabled && <Bell size={12} className="text-primary" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add Medicine Modal */}
      {showAddMedicine && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Medicine</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
                <input
                  type="text"
                  value={newMedicine.name}
                  onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter medicine name"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    value={newMedicine.dosage}
                    onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., 500mg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={newMedicine.type}
                    onChange={(e) => setNewMedicine({ ...newMedicine, type: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Injection">Injection</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Drops">Drops</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
                  <input
                    type="number"
                    value={newMedicine.currentStock}
                    onChange={(e) => setNewMedicine({ ...newMedicine, currentStock: parseInt(e.target.value) || 0 })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Low Stock Alert</label>
                  <input
                    type="number"
                    value={newMedicine.lowStockThreshold}
                    onChange={(e) => setNewMedicine({ ...newMedicine, lowStockThreshold: parseInt(e.target.value) || 5 })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={newMedicine.expiryDate}
                  onChange={(e) => setNewMedicine({ ...newMedicine, expiryDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddMedicine(false)}
                className="flex-1 p-3 border border-gray-300 text-gray-700 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={addMedicine}
                disabled={!newMedicine.name}
                className="flex-1 p-3 bg-primary text-white rounded-xl font-medium disabled:opacity-50"
              >
                Add Medicine
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSchedulesTab = () => (
    <div className="space-y-4">
      <div className="text-center py-8">
        <Clock size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Medicine Schedules</h3>
        <p className="text-gray-600 mb-4">Set up reminders for your medications</p>
        <button className="px-6 py-3 bg-primary text-white rounded-xl font-medium">
          Add Schedule
        </button>
      </div>
    </div>
  );

  const renderScannerTab = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-6 text-center">
        <div className="p-4 bg-primary/10 rounded-2xl inline-block mb-4">
          <Camera size={32} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Prescription Scanner</h3>
        <p className="text-gray-600 mb-6">
          Scan your prescription to automatically create medicine schedules and inventory
        </p>
        <button className="w-full py-3 bg-primary text-white rounded-xl font-medium mb-3">
          Scan Prescription
        </button>
        <p className="text-xs text-gray-500">
          Our AI will read your prescription and set up medication reminders automatically
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6">
        <h4 className="font-semibold text-gray-800 mb-3">How it works:</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
            <p className="text-sm text-gray-600">Take a clear photo of your prescription</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
            <p className="text-sm text-gray-600">AI extracts medicine names, dosages, and schedules</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
            <p className="text-sm text-gray-600">Review and confirm the extracted information</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
            <p className="text-sm text-gray-600">Reminders are automatically set up</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Medicine Manager"
        subtitle="Manage your medications and schedules"
      />
      
      <div className="px-6 pt-6 pb-24">
        {/* Tab Navigation */}
        <div className="flex bg-white rounded-2xl p-1 mb-6 shadow-sm">
          <button
            onClick={() => setActiveTab('medicines')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'medicines'
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Medicines
          </button>
          <button
            onClick={() => setActiveTab('schedules')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'schedules'
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Schedules
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all ${
              activeTab === 'scanner'
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Scanner
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'medicines' && renderMedicinesTab()}
        {activeTab === 'schedules' && renderSchedulesTab()}
        {activeTab === 'scanner' && renderScannerTab()}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Medicine;