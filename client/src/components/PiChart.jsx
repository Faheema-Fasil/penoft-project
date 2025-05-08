import React, { useRef, useEffect } from 'react';
import { Chart, PieController, ArcElement, Legend, Tooltip } from 'chart.js';

// Register necessary Chart.js components
Chart.register(PieController, ArcElement, Legend, Tooltip);

const DATA_COUNT = 5;

function generateData() {
  const data = [];
  for (let i = 0; i < DATA_COUNT; i++) {
    data.push(Math.floor(Math.random() * 201) - 100); // Random number between -100 and 100
  }
  return data;
}

function transparentize(color, opacity) {
  const alpha = Math.max(0, Math.min(1, opacity));
  if (color.startsWith('rgb(')) {
    const parts = color.substring(4, color.length - 1).split(',');
    return `rgba(${parts[0].trim()}, ${parts[1].trim()}, ${parts[2].trim()}, ${alpha})`;
  } else if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return color;
}

function colorize(opaque, hover, ctx) {
  const v = ctx.parsed;
  const c = v < -50 ? '#D60000'
    : v < 0 ? '#F46300'
    : v < 50 ? '#0358B6'
    : '#44DE28';

  const opacity = hover ? 1 - Math.abs(v / 150) - 0.2 : 1 - Math.abs(v / 150);

  return opaque ? c : transparentize(c, opacity);
}

function hoverColorize(ctx) {
  return colorize(false, true, ctx);
}

// Declare 'data' before 'config'
const data = {
  datasets: [{
    data: generateData()
  }]
};

const config = {
  type: 'pie',
  data: data, // Now 'data' is defined before being used here
  options: {
    plugins: {
      legend: false,
      tooltip: false,
    },
    elements: {
      arc: {
        backgroundColor: colorize.bind(null, false, false),
        hoverBackgroundColor: hoverColorize
      }
    }
  }
};

function PiChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = new Chart(
      chartRef.current,
      config
    );

    return () => {
      chartInstance.destroy();
    };
  }, []);

  return (
    <div>
        <h3 style={{color:"green"}} className='fw-bold d-flex justify-content-center align-items-center mb-5'>Gender Details</h3>
      <canvas ref={chartRef} />
      <div className="actions">
        <button onClick={() => {
          const chart = Chart.getChart(chartRef.current);
          if (chart) {
            chart.data.datasets.forEach(dataset => {
              dataset.data = generateData();
            });
            chart.update();
          }
        }}>
          Randomize
        </button>
        <button onClick={() => {
          const chart = Chart.getChart(chartRef.current);
          if (chart) {
            chart.options.cutout = chart.options.cutout ? '50%' : '50%';
            chart.update();
          }
        }}>
          Toggle Doughnut View
        </button>
      </div>
    </div>
  );
}

export default PiChart;