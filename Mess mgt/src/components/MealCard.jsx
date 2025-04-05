import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';

function MealCard({ meal }) {
  const [showFeedback, setShowFeedback] = useState(false);

  const handleFeedbackSubmit = async (feedback) => {
    try {
      // In a real app, this would save to Supabase
      console.log('Submitting feedback:', feedback);
      // Here you would add the Supabase insert call
      // await supabase.from('feedback').insert(feedback);
      setShowFeedback(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={meal.image}
        alt={meal.name}
        className="w-full h-32 object-cover rounded-md"
      />
      <h2 className="mt-2 text-lg font-semibold text-gray-900">{meal.name}</h2>
      <p className="text-sm text-gray-600">{meal.time}</p>
      <ul className="mt-2 list-none p-0">
        {meal.items.map((item, index) => (
          <li key={index} className="text-sm text-gray-500">
            {item}
          </li>
        ))}
      </ul>
      
      <button
        onClick={() => setShowFeedback(!showFeedback)}
        className="mt-4 w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
      >
        {showFeedback ? 'Hide Feedback' : 'Give Feedback'}
      </button>

      {showFeedback && (
        <FeedbackForm mealId={meal.id} onSubmit={handleFeedbackSubmit} />
      )}
    </div>
  );
}

export default MealCard;