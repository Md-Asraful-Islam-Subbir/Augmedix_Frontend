import React from 'react';
import Sidebar from './Sidebar';
import DashboardCards from './DashboardCards';
import ChartComponent from './ChartComponent';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <main className="dashboard-content">
        <h1>Admin Dashboard</h1>
        <DashboardCards />
        <div className="chart-container">
  <ChartComponent />
</div>
      </main>
    </div>
  );
};

export default AdminDashboard;
