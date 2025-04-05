import React, { useState } from 'react';
import { ChefHat, Users, Utensils, LineChart, Bell } from 'lucide-react';
import WeeklyMenuManager from './WeeklyMenuManager';
import StockManager from './StockManager';

const StatCard = ({ icon: Icon, title, value, className = "" }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-gray-400" />
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-500">{title}</div>
          <div className={`text-xl font-semibold ${className}`}>{value}</div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [showMenuManager, setShowMenuManager] = useState(false);
  const [showStockManager, setShowStockManager] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-semibold text-gray-900">MessMaster</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  setShowMenuManager(!showMenuManager);
                  setShowStockManager(false);
                }}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              >
                {showMenuManager ? 'Hide Menu Manager' : 'Update Menu'}
              </button>
              <button 
                onClick={() => {
                  setShowStockManager(!showStockManager);
                  setShowMenuManager(false);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                {showStockManager ? 'Hide Stock Manager' : 'Add Stock'}
              </button>
            </div>
          </div>

          {showMenuManager ? (
            <WeeklyMenuManager />
          ) : showStockManager ? (
            <StockManager />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Users} title="Total Students" value="1,234" />
                <StatCard icon={Utensils} title="Today's Bookings" value="987" />
                <StatCard icon={LineChart} title="Feedback Score" value="4.5/5" />
                <StatCard icon={Bell} title="Low Stock Items" value="3" className="text-red-500" />
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Overview</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Served</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wastage</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {['Breakfast', 'Lunch', 'Snacks', 'Dinner'].map((meal) => (
                        <tr key={meal}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{meal}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">245</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">238</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2.8%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4.2/5</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 