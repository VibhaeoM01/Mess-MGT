import React, { useState, useEffect } from 'react';
import { ChefHat } from 'lucide-react';
import MealCard from './MealCard';
import DailyStats from './DailyStats';
import FeedbackChart from './FeedbackChart';
import { supabase } from '../lib/supabase';

const StudentDashboard = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodayMeals = async () => {
      try {
        setLoading(true);
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];
        
        // Fetch today's meals from Supabase
        const { data, error } = await supabase
          .from('meals')
          .select('*')
          .eq('date', today);

        if (error) throw error;
        
        setMeals(data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching meals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayMeals();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading today's menu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">Error loading menu: {error}</div>
      </div>
    );
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
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Today's Menu</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-8">
            <DailyStats />
            <FeedbackChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard; 