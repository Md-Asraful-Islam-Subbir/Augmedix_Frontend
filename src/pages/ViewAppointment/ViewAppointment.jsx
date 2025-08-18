import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewAppointment.css';
const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/appointments/user-appointments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAppointments(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAppointments();
  }, []);

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!appointments.length) return <div>No appointments found.</div>;

  return (
  <div className="appointments-container">
    <h2 className="appointments-header">Your Appointments</h2>
    {appointments.map(appointment => (
      <div key={appointment._id} className="appointment-card">
        <p><strong>Patient Name:</strong> {appointment.name}</p>
        <p><strong>Doctor:</strong> {appointment.doctor}</p>
        <p><strong>Date:</strong> {new Date(appointment.preferredDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {appointment.preferredTime}</p>
        <p><strong>Status:</strong> <span className="status">{appointment.status}</span></p>
      </div>
    ))}
  </div>
);
};

export default UserAppointments;