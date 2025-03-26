import React, { useState, useEffect, useRef } from "react";
import ReactWebcam from "react-webcam";
import "./DoctorPatients.css";
import { useNavigate } from "react-router-dom";

const DoctorPatients = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState(null); // State to store recognition result
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
        const response = await fetch("http://localhost:4000/api/patients", {
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

  const captureImage = async (patientId) => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturing(false);

      if (!imageSrc) {
        alert("Failed to capture image");
        return;
      }

      // Extract the raw Base64 data (removing 'data:image/png;base64,')
      const base64Data = imageSrc.split(',')[1];

      try {
        const response = await fetch(`http://localhost:4000/api/patients/${patientId}/uploadImage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Data, patientId }),
        });

        const result = await response.json();
        console.log("Recognition result:", result);

        // Set the recognition result to display in the UI
        setRecognitionResult(result);

        // Update the patient list with the new image
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
      const response = await fetch(`http://localhost:4000/api/patients/${patientId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Patient removed successfully");
        setPatients((prevPatients) => prevPatients.filter((p) => p._id !== patientId));
      } else {
        console.error("Failed to remove patient");
      }
    } catch (error) {
      console.error("Error removing patient:", error);
    }
  };

  const closeRecognitionModal = () => {
    setRecognitionResult(null); // Clear the recognition result
  };

  return (
    <div className="doctor-patients-container">
      <h2>Patient List</h2>
      <table className="patients-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Records</th>
            <th>Report</th>
            <th>Information</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>
                {patient.image ? (
                  <img src={patient.image} alt="Patient" className="patient-image" />
                ) : (
                  <button onClick={() => setCapturing(patient._id)}>Capture</button>
                )}
              </td>
              <td>
                Name: {patient.firstName} {patient.lastName}
                <br />
                Appointment: {patient.appointmentDate} at {patient.appointmentTime}
                <br />
                P History: {patient.procedure}
              </td>
              <td>{patient.phone}</td>
              <td>
                <button>Click</button>
              </td>
              <td>
                <button onClick={() => navigate("/report", { state: { patient } })}>Reports</button>
              </td>
              <td>
                <button className="view-button" onClick={() => setSelectedPatient(patient)}>
                  View
                </button>
              </td>
              <td>
                <button onClick={() => removePatient(patient._id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Webcam Modal */}
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

      {/* Modal for Viewing Patient Details */}
      {selectedPatient && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Patient Details</h3>
            <p>
              <strong>Name:</strong> {selectedPatient.firstName} {selectedPatient.lastName}
            </p>
            <p>
              <strong>Phone:</strong> {selectedPatient.phone}
            </p>
            <p>
              <strong>Email:</strong> {selectedPatient.email}
            </p>
            <p>
              <strong>Address:</strong> {selectedPatient.address}, {selectedPatient.city}, {selectedPatient.state}, {selectedPatient.zip}
            </p>
            <p>
              <strong>Gender:</strong> {selectedPatient.gender}
            </p>
            <p>
              <strong>Department:</strong> {selectedPatient.department}
            </p>
            <p>
              <strong>Doctor:</strong> {selectedPatient.doctor}
            </p>
            <p>
              <strong>Procedure:</strong> {selectedPatient.procedure || "N/A"}
            </p>
            {selectedPatient.image && (
              <img src={selectedPatient.image} alt="Patient" className="patient-modal-image" />
            )}
            <button className="close-button" onClick={() => setSelectedPatient(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Recognition Result */}
      {recognitionResult && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Recognition Result</h3>
            <p>
              <strong>Match:</strong> {recognitionResult.match ? "Yes" : "No"}
            </p>
            <p>
              <strong>Confidence:</strong> 
              {recognitionResult.confidence !== undefined && !isNaN(recognitionResult.confidence) 
                ? recognitionResult.confidence.toFixed(2) + "%" 
                : "N/A"}
            </p>
            <p>
              <strong>Message:</strong> {recognitionResult.message}
            </p>
            {recognitionResult.patient && (
              <p>
                <strong>Patient ID:</strong> {recognitionResult.patient.id}
              </p>
            )}
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