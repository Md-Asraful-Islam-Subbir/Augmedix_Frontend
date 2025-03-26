import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./ReportPage.css";

const ReportPage = () => {
  const location = useLocation();
  const { patient } = location.state || {};
  const [documents, setDocuments] = useState([]);
  const [prescription, setPrescription] = useState("");
  const mediaRecorderRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recording, setRecording] = useState(false);

  if (!patient) {
    return <h2>No Patient Selected</h2>;
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDocuments((prevDocs) => [...prevDocs, URL.createObjectURL(file)]);
    }
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    let audioChunks = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      setAudioUrl(URL.createObjectURL(audioBlob));
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="report-page">
      <h2>Patient Report</h2>
      
      {/* Patient Image */}
      <div className="patient-image-container">
        <img src={patient.image || "/placeholder.jpg"} alt="Patient" />
      </div>

      {/* Patient Information */}
      <div className="patient-info">
        <p><strong>Name:</strong> {patient.firstName} {patient.lastName}</p>
        <p><strong>Phone:</strong> {patient.phone}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Procedure:</strong> {patient.procedure || "N/A"}</p>
      </div>

      {/* Document Upload */}
      <div className="document-section">
        <h3>Documents</h3>
        <input type="file" onChange={handleFileUpload} />
        <ul>
          {documents.map((doc, index) => (
            <li key={index}>
              <a href={doc} target="_blank" rel="noopener noreferrer">View Document {index + 1}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Voice Recorder */}
      <div className="voice-recorder">
        <h3>Voice Recorder</h3>
        {recording ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : (
          <button onClick={startRecording}>Start Recording</button>
        )}
        {audioUrl && <audio controls src={audioUrl}></audio>}
      </div>

      {/* Prescription Writing */}
      <div className="prescription-section">
        <h3>Write Prescription</h3>
        <textarea
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
          placeholder="Write prescription here..."
        />
        <button onClick={() => alert("Prescription Saved!")}>Save Prescription</button>
      </div>
    </div>
  );
};

export default ReportPage;
