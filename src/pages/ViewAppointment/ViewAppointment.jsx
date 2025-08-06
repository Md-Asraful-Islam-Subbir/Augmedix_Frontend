import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewAppointment = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/appointments/appointments/${id}`);
        setAppointment(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load appointment.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  if (loading) return <div>Loading appointment...</div>;
  if (error) return <div>{error}</div>;
  if (!appointment) return <div>No appointment found.</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Appointment Details</h2>
      <p><strong>Patient Name:</strong> {appointment.name}</p>
      <p><strong>Doctor:</strong> {appointment.doctor}</p>
      <p><strong>Contact:</strong> {appointment.contact}</p>
      <p><strong>Preferred Date:</strong> {new Date(appointment.preferredDate).toLocaleDateString()}</p>
      <p><strong>Preferred Time:</strong> {appointment.preferredTime}</p>
      <p><strong>Status:</strong> {appointment.status}</p>
    </div>
  );
};

export default ViewAppointment;
