

import React, { useState } from 'react';
import { Calendar, Clock, ThumbsUp, ThumbsDown, ChefHat, Utensils, Users, LineChart, Bell } from 'lucide-react';
import MealCard  from './components/MealCard';
import DailyStats  from './components/DailyStats';
import  FeedbackChart  from './components/FeedbackChart';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const meals = [
    {
      id: 1,
      name: "Breakfast",
      time: "7:30 AM - 9:30 AM",
      items: ["Masala Dosa", "Sambar", "Coconut Chutney", "Fresh Fruits", "Tea/Coffee"],
      image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Lunch",
      time: "12:30 PM - 2:30 PM",
      items: ["Jeera Rice", "Dal Tadka", "Mixed Vegetables", "Roti", "Raita"],
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 3,
      name: "Snacks",
      time: "4:30 PM - 5:30 PM",
      items: ["Samosa", "Mint Chutney", "Tea/Coffee"],
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=500",
    },
    {
      id: 4,
      name: "Dinner",
      time: "7:30 PM - 9:30 PM",
      items: ["Pulao", "Paneer Butter Masala", "Naan", "Sweet"],
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=500",
    }
  ];

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-semibold text-gray-900">MessMaster</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsAdmin(!isAdmin)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isAdmin ? 'Switch to Student View' : 'Switch to Admin View'}
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isAdmin ? (
          <AdminDashboard />
        ) : (
          <StudentDashboard meals={meals} />
        )}
      </main>
    </div>
  );
}

function LoginScreen({ onLogin }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <ChefHat className="mx-auto h-12 w-12 text-orange-500" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to MessMaster
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function StudentDashboard({ meals }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Today's Menu</h1>
        <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
          Pre-Book Meal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-8">
        <DailyStats />
        {/* <FeedbackChart /> */}
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
            Update Menu
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Add Stock
          </button>
        </div>
      </div>

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
    </div>
  );
}

function StatCard({ icon: Icon, title, value, className = "" }) {
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
}

export default App; 