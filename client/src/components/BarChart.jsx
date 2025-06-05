import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

function BarChart({ data }) {
  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        // position: "right",
      },
      title: {
        display: true,
      },
      datalabels: {
        // anchor: 'end',
        align: 'right',
        color: '#333',
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}: ${value}`;
        }, 
      },
    },
  };

  return (
    <div>
      <h5 style={{ textAlign: "center", fontWeight: "bolder", color: "green" }}>
        Registration Category
      </h5>
      <Bar data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
}

export default BarChart;
