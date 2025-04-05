import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Clock, Check } from 'lucide-react';
import FeedbackForm from './FeedbackForm';

const MealCard = ({ meal }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [attendance, setAttendance] = useState(true); // Default to YES
  const [showConfirm, setShowConfirm] = useState(false);
  const [tempAttendance, setTempAttendance] = useState(null);

  const handleAttendance = (value) => {
    if (value === attendance) return; // If clicking the same button, do nothing
    
    setTempAttendance(value);
    setShowConfirm(true);
  };

  const confirmAttendance = () => {
    setAttendance(tempAttendance);
    setShowConfirm(false);
    // Here you can add logic to save the attendance to Supabase
  };

  const cancelChange = () => {
    setShowConfirm(false);
    setTempAttendance(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-md text-sm">
          {meal.time}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{meal.name}</h3>
        
        <div className="space-y-2 mb-4">
          {meal.items.map((item, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              {item}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {meal.time}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleAttendance(true)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                attendance === true && !showConfirm
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100'
              }`}
            >
              YES
            </button>
            <button
              onClick={() => handleAttendance(false)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                attendance === false && !showConfirm
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-red-100'
              }`}
            >
              NO
            </button>
          </div>
        </div>

        {showConfirm && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800 mb-2">
              Are you sure you want to change your attendance to {tempAttendance ? 'YES' : 'NO'}?
            </p>
            <div className="flex space-x-2">
              <button
                onClick={confirmAttendance}
                className="flex items-center px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
              >
                <Check className="w-4 h-4 mr-1" />
                Confirm
              </button>
              <button
                onClick={cancelChange}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowFeedback(!showFeedback)}
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          {showFeedback ? 'Hide Feedback' : 'Give Feedback'}
        </button>

        {showFeedback && (
          <div className="mt-4">
            <FeedbackForm mealId={meal.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MealCard;