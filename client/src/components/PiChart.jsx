import React, { useRef, useEffect } from "react";
import { Chart, PieController, ArcElement, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(PieController, ArcElement, Legend, Tooltip, ChartDataLabels);

function PiChart({ chartData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: "pie",
      data: chartData,
      options: {
        plugins: {
          legend: { display: true, position: "bottom" },
          tooltip: { enabled: true },
          datalabels: {
            color: "#333",
            font: { weight: "bold", size: 16 },
            formatter: (value, context) => {
              const label = context.chart.data.labels[context.dataIndex];
              return `${label}: ${value}`;
            }, 
          },
        },
        cutout: "70%",
      },
    });

    return () => chartInstance.destroy();
  }, [chartData]);

  return (
    <div>
      <h5 style={{ color: "green" }} className="fw-bold d-flex justify-content-center align-items-center mb-5">
        Gender Details
      </h5>
      <canvas ref={chartRef} style={{ width: "100%", height: "auto" }} />
    </div>
  );
}

export default PiChart;
