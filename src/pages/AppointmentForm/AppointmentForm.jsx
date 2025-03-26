import React, { useState, useEffect } from "react";
import './AppointmentForm.css';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    gender: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    visitedBefore: "",
    department: "",
    doctor: "",
    procedure: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [doctors, setDoctors] = useState([]);

  // Fetch available doctors from the backend
  useEffect(() => {
    fetch("http://localhost:4000/api/doctors")
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token=localStorage.getItem('token')
      const response = await fetch("http://localhost:4000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Appointment request submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          dobDay: "",
          dobMonth: "",
          dobYear: "",
          gender: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          email: "",
          visitedBefore: "",
          department: "",
          doctor: "",
          procedure: "",
          appointmentDate: "",
          appointmentTime: "",
        });
      } else {
        alert("Error submitting the form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting the form");
    }
  };

  return (
    <div className="contact-container">
      <h2>Doctor Appointment Request Form</h2>
      <p>Fill out the form below, and we will contact you to confirm your appointment.</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />

          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label>Date of Birth</label>
          <div className="form-group1">
            <select name="dobDay" value={formData.dobDay} onChange={handleChange} required>
              <option value="">Day</option>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            <select name="dobMonth" value={formData.dobMonth} onChange={handleChange} required>
              <option value="">Month</option>
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => (
                <option key={i} value={m}>{m}</option>
              ))}
            </select>

            <select name="dobYear" value={formData.dobYear} onChange={handleChange} required>
              <option value="">Year</option>
              {[...Array(100)].map((_, i) => {
                let year = new Date().getFullYear() - i;
                return <option key={i} value={year}>{year}</option>;
              })}
            </select>
          </div>
        </div>

        {/* Gender & Phone */}
        <div className="form-group1">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        {/* Address */}
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
          <br />
          <div className="form-group1">
            <input className="abc" type="text" id="city" name="city" value={formData.city} placeholder="City" onChange={handleChange} required />
            <input type="text" id="state" name="state" value={formData.state} placeholder="State" onChange={handleChange} required />
            <input type="text" id="zip" name="zip" value={formData.zip} placeholder="ZIP Code" onChange={handleChange} required />
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        {/* Visited Before */}
        <div className="form-group1">
          <label>Have you visited our facility before?</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="visitedBefore" value="yes" onChange={handleChange} required /> Yes
            </label>
            <label>
              <input type="radio" name="visitedBefore" value="no" onChange={handleChange} required /> No
            </label>
          </div>
        </div>

        {/* Department & Procedure */}
        <div className="form-group">
          <label htmlFor="department">Which department?</label>
          <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} required />

          <label htmlFor="procedure">Procedure</label>
          <input type="text" id="procedure" name="procedure" value={formData.procedure} onChange={handleChange} required />
        </div>

        {/* Select Doctor */}
        <div className="form-group">
          <label htmlFor="doctor">Select a Doctor</label>
          <select id="doctor" name="doctor" value={formData.doctor} onChange={handleChange} required>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor.name}>{doctor.name}</option>
            ))}
          </select>
        </div>

        {/* Appointment Date & Time */}
        <div className="form-group">
          <label htmlFor="appointmentDate">Preferred Appointment Date</label>
          <input type="date" id="appointmentDate" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />

          <label htmlFor="appointmentTime">Preferred Time</label>
          <select id="appointmentTime" name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} required>
            <option value="">Select Time</option>
            {["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "02:00 PM", "02:30 PM", "04:00 PM", "04:30 PM"].map((time, i) => (
              <option key={i} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
