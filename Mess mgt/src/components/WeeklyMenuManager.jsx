import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2, Save } from 'lucide-react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];

const initialMenu = {
  Monday: {
    Breakfast: ['Masala Dosa', 'Sambar', 'Coconut Chutney', 'Fresh Fruits', 'Tea/Coffee'],
    Lunch: ['Jeera Rice', 'Dal Tadka', 'Mixed Vegetables', 'Roti', 'Raita'],
    Snacks: ['Samosa', 'Mint Chutney', 'Tea/Coffee'],
    Dinner: ['Pulao', 'Paneer Butter Masala', 'Naan', 'Sweet']
  },
  Tuesday: {
    Breakfast: ['Idli', 'Sambar', 'Coconut Chutney', 'Fresh Fruits', 'Tea/Coffee'],
    Lunch: ['Steamed Rice', 'Sambar', 'Rasam', 'Curd', 'Papad'],
    Snacks: ['Vada', 'Coconut Chutney', 'Tea/Coffee'],
    Dinner: ['Biryani', 'Raita', 'Salad', 'Sweet']
  },
  Wednesday: {
    Breakfast: ['Poha', 'Jalebi', 'Fresh Fruits', 'Tea/Coffee'],
    Lunch: ['Fried Rice', 'Manchurian', 'Spring Roll', 'Sauce'],
    Snacks: ['Bread Pakora', 'Green Chutney', 'Tea/Coffee'],
    Dinner: ['Rajma Chawal', 'Salad', 'Raita', 'Sweet']
  },
  Thursday: {
    Breakfast: ['Upma', 'Sambar', 'Fresh Fruits', 'Tea/Coffee'],
    Lunch: ['Steamed Rice', 'Sambar', 'Rasam', 'Curd', 'Papad'],
    Snacks: ['Pav Bhaji', 'Tea/Coffee'],
    Dinner: ['Chole Bhature', 'Salad', 'Sweet']
  },
  Friday: {
    Breakfast: ['Aloo Paratha', 'Curd', 'Fresh Fruits', 'Tea/Coffee'],
    Lunch: ['Steamed Rice', 'Sambar', 'Rasam', 'Curd', 'Papad'],
    Snacks: ['Cutlet', 'Green Chutney', 'Tea/Coffee'],
    Dinner: ['Butter Chicken', 'Naan', 'Salad', 'Sweet']
  },
  Saturday: {
    Breakfast: ['Puri', 'Aloo Sabzi', 'Fresh Fruits', 'Tea/Coffee'],
    Lunch: ['Steamed Rice', 'Sambar', 'Rasam', 'Curd', 'Papad'],
    Snacks: ['Pasta', 'Garlic Bread', 'Tea/Coffee'],
    Dinner: ['Veg Biryani', 'Raita', 'Salad', 'Sweet']
  },
  Sunday: {
    Breakfast: ['Pancakes', 'Maple Syrup', 'Fresh Fruits', 'Tea/Coffee'],
    Lunch: ['Steamed Rice', 'Sambar', 'Rasam', 'Curd', 'Papad'],
    Snacks: ['Sandwich', 'Tea/Coffee'],
    Dinner: ['Dal Makhani', 'Naan', 'Salad', 'Sweet']
  }
};

function WeeklyMenuManager() {
  const [menu, setMenu] = useState(initialMenu);
  const [editing, setEditing] = useState(false);
  const [expandedDay, setExpandedDay] = useState(null);

  const handleItemChange = (day, mealType, index, newValue) => {
    const updatedMenu = { ...menu };
    updatedMenu[day][mealType][index] = newValue;
    setMenu(updatedMenu);
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log('Saving menu:', menu);
    setEditing(false);
  };

  const toggleDay = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Weekly Menu Management</h2>
        <button
          onClick={() => setEditing(!editing)}
          className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          {editing ? (
            <>
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4" />
              <span>Edit Menu</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleDay(day)}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
            >
              <span className="font-medium text-gray-900">{day}</span>
              {expandedDay === day ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {expandedDay === day && (
              <div className="p-4 space-y-4">
                {mealTypes.map((mealType) => (
                  <div key={mealType} className="space-y-2">
                    <h3 className="font-medium text-gray-700">{mealType}</h3>
                    <div className="space-y-2">
                      {menu[day][mealType].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          {editing ? (
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => handleItemChange(day, mealType, index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                          ) : (
                            <span className="text-gray-600">{item}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {editing && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Save All Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default WeeklyMenuManager; 