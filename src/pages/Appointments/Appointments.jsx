import React, { useState, useEffect } from "react";
import "./Appointments.css";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [serialNumbers, setSerialNumbers] = useState({});
  const [viewDetails, setViewDetails] = useState(null);

  const availableTimes = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "02:00 PM", "02:30 PM", "04:00 PM", "04:30 PM"
  ];

  // Fetch appointments and serial numbers from the backend
  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, redirecting to login.");
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setAppointments(data);

          // Initialize serialNumbers state with data from the backend
          const serials = {};
          data.forEach((appt) => {
            if (appt.serialNumber) {
              serials[appt._id] = appt.serialNumber;
            }
          });
          setSerialNumbers(serials);
        } else {
          console.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Handle rescheduling an appointment
  const handleReschedule = async () => {
    if (!selectedAppointment || !rescheduleTime) {
      alert("Please select an appointment and choose a new time.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:4000/api/appointments/${selectedAppointment._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ appointmentTime: rescheduleTime }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Reschedule successful:", data);

        // Update the appointments list with the new time
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === selectedAppointment._id
              ? { ...appt, appointmentTime: rescheduleTime }
              : appt
          )
        );

        // Reset states
        setSelectedAppointment(null);
        setRescheduleTime("");

        // Notify the user
        alert("Appointment rescheduled successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error rescheduling appointment:", errorData);
        alert(`Error rescheduling appointment: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      alert("An error occurred while rescheduling the appointment. Please try again.");
    }
  };

  // Handle removing an appointment
  const handleRemove = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete an appointment.");
      return;
    }
  
    if (!window.confirm("Are you sure you want to delete this appointment?")) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:4000/api/appointments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        setAppointments((prev) => prev.filter((appt) => appt._id !== id));
        alert("Appointment deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error deleting appointment: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("An error occurred while deleting the appointment.");
    }
  };
  // Handle serial number input changes
  const handleSerialNumberChange = (id, value) => {
    setSerialNumbers((prev) => ({ ...prev, [id]: value }));
  };

  // Save serial number for an appointment
  const handleSaveSerialNumber = async (id) => {
    const token = localStorage.getItem("token");
    const serialNumber = serialNumbers[id];

    if (!serialNumber) {
      alert("Please enter a serial number.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/appointments/${id}/serial`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ serialNumber }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Serial number saved:", data);
        alert(`Serial number ${serialNumber} saved for appointment ${id}`);
      } else {
        const errorData = await response.json();
        console.error("Error saving serial number:", errorData);
        alert(`Error saving serial number: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error saving serial number:", error);
      alert("An error occurred while saving the serial number. Please try again.");
    }
  };
  const handleConfirm = async (appt) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to confirm the patient.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:4000/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: appt.firstName,
          lastName: appt.lastName,
          phone: appt.phone,
          email: appt.email,
          address: appt.address,
          city: appt.city,
          state: appt.state,
          zip: appt.zip,
          gender: appt.gender,
          department: appt.department,
          doctor: appt.doctor,
          procedure: appt.procedure,
          appointmentDate: appt.appointmentDate,
          appointmentTime: appt.appointmentTime,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const patientId = data.patient._id; // The MongoDB generated _id
        alert(`Patient confirmed! ID: ${patientId}`);
      } else {
        const errorData = await response.json();
        alert(`Error confirming patient: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error confirming patient:", error);
      alert("An error occurred while confirming the patient.");
    }
  };
  
  return (
    <div className="appointment-container">
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id} className="appointment-item">
            <div className="appointment-info">
              <p><strong>Name:</strong> {appt.firstName} {appt.lastName}</p>
              <p><strong>Phone:</strong> {appt.phone}</p>
              <p><strong>Date:</strong> {appt.appointmentDate} at {appt.appointmentTime}</p>
              <p><strong>Doctor:</strong> {appt.doctor}</p>
            </div>

            <div className="serial-input-container">
              <input
                type="text"
                className="serial-input"
                placeholder="Enter Serial No"
                value={serialNumbers[appt._id] || ""}
                onChange={(e) => handleSerialNumberChange(appt._id, e.target.value)}
              />
              <button onClick={() => handleSaveSerialNumber(appt._id)}>Save</button>
            </div>

            <div className="action-buttons">
              <button onClick={() => setViewDetails(appt)}>View Details</button>
              <button onClick={() => setSelectedAppointment(appt)}>Reschedule</button>
              <button onClick={() => handleRemove(appt._id)}>Remove</button>
              <button onClick={() => handleConfirm(appt)}>Confirm</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Reschedule Modal */}
      {selectedAppointment && (
        <div className="modal">
          <h3>Reschedule Appointment</h3>
          <select
            value={rescheduleTime}
            onChange={(e) => setRescheduleTime(e.target.value)}
          >
            <option value="">Select New Time</option>
            {availableTimes.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
          <button onClick={handleReschedule}>Confirm</button>
          <button onClick={() => setSelectedAppointment(null)}>Cancel</button>
        </div>
      )}

      {/* View Details Modal */}
      {viewDetails && (
        <div className="details-modal">
          <h3>Appointment Details</h3>
          <p><strong>Serial No:</strong> {serialNumbers[viewDetails._id] || "Not assigned"}</p>
          <p><strong>Name:</strong> {viewDetails.firstName} {viewDetails.lastName}</p>
          <p><strong>Phone:</strong> {viewDetails.phone}</p>
          <p><strong>Email:</strong> {viewDetails.email}</p>
          <p><strong>Address:</strong> {viewDetails.address}, {viewDetails.city}, {viewDetails.state}, {viewDetails.zip}</p>
          <p><strong>Gender:</strong> {viewDetails.gender}</p>
          <p><strong>Department:</strong> {viewDetails.department}</p>
          <p><strong>Doctor:</strong> {viewDetails.doctor}</p>
          <p><strong>Procedure:</strong> {viewDetails.procedure}</p>
          <p><strong>Appointment Date:</strong> {viewDetails.appointmentDate}</p>
          <p><strong>Appointment Time:</strong> {viewDetails.appointmentTime}</p>

          <button onClick={() => setViewDetails(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Appointment;