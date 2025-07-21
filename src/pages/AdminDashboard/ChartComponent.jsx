import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./ChartComponent.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = () => {
  const data = {
    labels: ["Users", "Doctors", "Revenue", "Appointments"],
    datasets: [
      {
        data: [300, 50, 100, 80],
        backgroundColor: ["#28a745", "#6f42c1", "#ffc107", "#007bff"],
        borderWidth: 1,
      },
    ],
  };

 return (
  <div className="chart-wrapper">
    <Pie data={data} />
  </div>
);
};

export default ChartComponent;