import React from 'react';

function DailyStats() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Statistics</h2>
      <ul className="list-none p-0 m-0">
        <li className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Total Meals Served:</span>
          <span className="text-sm text-gray-500">1,200</span>
        </li>
        <li className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Average Feedback Score:</span>
          <span className="text-sm text-gray-500">4.5/5</span>
        </li>
        <li className="flex justify-between">
          <span className="text-sm font-medium text-gray-700">Meals Wasted:</span>
          <span className="text-sm text-gray-500">50</span>
        </li>
      </ul>
    </div>
  );
}

export default DailyStats;