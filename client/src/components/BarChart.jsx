import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
    
  const labels = ['Cat 01', 'Cat 02', 'Cat 03']; 
  const data = {
    labels: labels,
    datasets: [{
      axis: 'y',
      label: 'My First Dataset',
      data: [19512, 10452, 681],
      fill: false,
      backgroundColor: [
        'rgb(0, 132, 22)',
        'rgb(0, 146, 131)',
        'rgb(0, 255, 213)',

      ],
      borderColor: [
        'rgb(0, 132, 22)',
        'rgb(0, 145, 131)',
        'rgb(0, 255, 229)',
      ],
      borderWidth: 1,
      borderRadius: 5,
      borderSkipped: false,
    }]
  };

  const options = {
    indexAxis: 'y', 
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        },
    },
  };

  return (
    <div >
    <h3 style={{ textAlign: 'center',fontWeight:"bolder",color:"green" }}>Registration Category</h3>
    <Bar data={data} options={options} />
  </div>
  )
}

export default BarChart;