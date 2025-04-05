import React from 'react';

function MealCard({ meal }) {
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
    </div>
  );
}

export default MealCard;