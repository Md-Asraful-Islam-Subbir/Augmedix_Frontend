import React, { useState, useEffect, useRef } from "react";
import ReactWebcam from "react-webcam";
import "./DoctorPatients.css";
import { useNavigate } from "react-router-dom";

const DoctorPatients = () => {
  const [patients, setPatients] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState(null);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, redirecting to login.");
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/api/patients/my-patients", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setPatients(data);
        } else {
          console.error("Failed to fetch patients");
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchDoctor = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:4000/api/doctors/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setDoctor(data);
        } else {
          console.error("Failed to fetch doctor profile");
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };

    fetchDoctor();
  }, []);

  const captureImage = async (patientId) => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturing(false);

      if (!imageSrc) {
        alert("Failed to capture image");
        return;
      }

      const base64Data = imageSrc.split(',')[1];

      try {
        const response = await fetch(`http://localhost:4000/api/patients/${patientId}/uploadImage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Data, patientId }),
        });

        const result = await response.json();
        console.log("Recognition result:", result);
        setRecognitionResult(result);

        setPatients((prevPatients) =>
          prevPatients.map((p) =>
            p._id === patientId ? { ...p, image: imageSrc } : p
          )
        );
      } catch (error) {
        console.error("Error processing face recognition:", error);
      }
    }
  };

const removePatient = async (patientId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:4000/api/patients/${patientId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert("Patient removed successfully");
      setPatients((prevPatients) => prevPatients.filter((p) => p._id !== patientId));
    } else {
      const errData = await response.json();
      console.error("Failed to remove patient:", errData.message);
    }
  } catch (error) {
    console.error("Error removing patient:", error);
  }
};


  const closeRecognitionModal = () => {
    setRecognitionResult(null);
  };

  return (
    <div className="doctor-patients-container">
      <h2>Patient List</h2>
      <table className="patients-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Doctor</th>
            <th>Appointment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>
                {patient.image ? (
                  <img 
                    src={patient.image.startsWith('data:') ? patient.image : `data:image/jpeg;base64,${patient.image}`} 
                    alt="Patient" 
                    className="patient-image" 
                  />
                ) : (
                  <button onClick={() => setCapturing(patient._id)}>Capture</button>
                )}
              </td>
              <td>{patient.name}</td>
              <td>{patient.contact}</td>
              <td>{patient.doctor}</td>
              <td>
                {patient.appointmentDate} at {patient.appointmentTime}
              </td>
              <td>
                <button onClick={() => setSelectedPatient(patient)}>View</button>
                <button onClick={() => removePatient(patient._id)}>Remove</button>
                <button onClick={() => navigate("/report", { state: { patient, doctor } })}>
                  Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {capturing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="webcam-container">
              <ReactWebcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "user" }}
                width={500}
                height={375}
              />
              <div className="webcam-controls">
                <button onClick={() => captureImage(capturing)}>Capture & Save</button>
                <button onClick={() => setCapturing(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPatient && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Patient Details</h3>
            <p><strong>Name:</strong> {selectedPatient.name}</p>
            <p><strong>Contact:</strong> {selectedPatient.contact}</p>
            <p><strong>Doctor:</strong> {selectedPatient.doctor}</p>
            <p><strong>Appointment Date:</strong> {selectedPatient.appointmentDate}</p>
            <p><strong>Appointment Time:</strong> {selectedPatient.appointmentTime}</p>
            {selectedPatient.image && (
              <img 
                src={selectedPatient.image.startsWith('data:') ? selectedPatient.image : `data:image/jpeg;base64,${selectedPatient.image}`} 
                alt="Patient" 
                className="patient-modal-image" 
              />
            )}
            <button className="close-button" onClick={() => setSelectedPatient(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {recognitionResult && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Recognition Result</h3>
            <p><strong>Match:</strong> {recognitionResult.match ? "Yes" : "No"}</p>
            <p>
              <strong>Confidence:</strong> 
              {recognitionResult.confidence !== undefined && !isNaN(recognitionResult.confidence) 
                ? recognitionResult.confidence.toFixed(2) + "%" 
                : "N/A"}
            </p>
            <p><strong>Message:</strong> {recognitionResult.message}</p>
            <button className="close-button" onClick={closeRecognitionModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPatients;