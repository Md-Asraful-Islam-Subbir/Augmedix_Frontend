
import { Link } from 'react-router-dom';
import './DoctorsPage.css';

const DoctorsPage = () => {
  return (
    <div className="doctors-page">
      <h1>Doctors Management</h1>
      <div className="doctor-actions">
        <div className="doctor-card">
          <h2>Apply Doctor</h2>
          <p>Review and manage doctor applications.</p>
        </div>

        <Link to="/add-doctor" className="doctor-card">
          <h2>Add Doctor</h2>
          <p>Manually add a new doctor to the system.</p>
        </Link>

        <div className="doctor-card">
          <h2>Send Notification</h2>
          <p>Notify doctors about important updates.</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
