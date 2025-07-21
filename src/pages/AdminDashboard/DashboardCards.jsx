import React from 'react';
import './DashboardCards.css';

const DashboardCards = () => {
  return (
    <div className="dashboard-cards">
  <div className="dashboard-card green">
    <h4>Total Users</h4>
    <h2>277</h2>
    <p>Last Month</p>
  </div>
  <div className="dashboard-card purple">
    <h4>Total Doctors</h4>
    <h2>35</h2>
    <p>Last Month</p>
  </div>
  <div className="dashboard-card yellow">
    <h4>Revenue</h4>
    <h2>$12,000</h2>
    <p>Last Month</p>
  </div>
  <div className="dashboard-card blue">
    <h4>Appointments</h4>
    <h2>145</h2>
    <p>Last Month</p>
  </div>
</div>
  );
};

export default DashboardCards;
