import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ViewDoctor.css";

const ViewDoctor = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/doctorsforappointment");
        if (!res.ok) throw new Error("Failed to fetch doctors");
        const data = await res.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="view-doctor-container">
      <h2>Available Doctors</h2>
      <div className="doctor-grid">
        {doctors.map((doc) => (
          <div key={doc._id} className="doctor-card">
            <img
              src="https://alabamaoncology.com/wp-content/uploads/Doctor_0013_AAO-365976-c.jpg"
              alt={`Dr. ${doc.name}`}
              className="doctor-img"
            />
            <h3>{doc.name}</h3>
            <p className="specialization">{doc.specialization}</p>
            <p className="email">{doc.email}</p>
            <Link to="/appointment-form">
              <button>Book Appointment</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewDoctor;
