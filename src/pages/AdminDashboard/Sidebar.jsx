import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">ClinixNote</h2>
      <ul>
        <li>Dashboard</li>
        <li>Admins</li>
        <li>
          <Link to="/doctors" className="sidebar-link">Doctors</Link>
        </li>
        <li>Settings</li>
        <li>Confirmation</li>
        <li>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
