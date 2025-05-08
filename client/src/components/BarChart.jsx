import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({ data }) {
  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", fontWeight: "bolder", color: "green" }}>Registration Category</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
