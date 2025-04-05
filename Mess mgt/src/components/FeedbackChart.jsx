// filepath: d:\All Materials\AI develop\MESS\p\Mess\src\components\FeedbackChart.jsx
import React from 'react';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the required components
ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);

const FeedbackChart = () => {
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Feedback Score',
        data: [4.5, 4.2, 4.8, 4.6, 4.7],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Feedback Scores',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default FeedbackChart;