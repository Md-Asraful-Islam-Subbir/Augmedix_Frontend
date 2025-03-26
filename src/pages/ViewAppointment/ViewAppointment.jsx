import React, { useEffect, useState } from "react";
import "./ViewAppointment.css";

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/api/appointmentsClient", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          setError("Failed to fetch appointments.");
        }
      } catch (error) {
        setError("Error fetching appointments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="view-appointment-container">
      <h2>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id} className="appointment-item">
              <p><strong>Doctor:</strong> {appt.doctor}</p>
              <p><strong>Date:</strong> {appt.appointmentDate}</p>
              <p><strong>Time:</strong> {appt.appointmentTime}</p>
              <p><strong>Serial No:</strong> {appt.serialNumber || "Not assigned"}</p>
              <p><strong>Procedure:</strong> {appt.procedure}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewAppointment;
