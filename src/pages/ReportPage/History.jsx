import React, { useEffect, useState } from "react";
import "./History.css";

const History = ({ patient }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryById = async () => {
      if (!patient?.id) {
        setReport({ history: "No previous history available", patientName: patient?.firstName + " " + patient?.lastName });
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:4000/api/report/by-patient-id/${patient.id}`);
        if (!res.ok) throw new Error("Failed to fetch report by patient ID");

        const data = await res.json();
        if (data.length > 0) {
          setReport(data[0]);
        } else {
          setReport({ history: "No previous history available", patientName: patient?.firstName + " " + patient?.lastName });
        }
      } catch (err) {
        console.error("Error loading history by patient ID:", err);
        setReport({ history: "No previous history available", patientName: patient?.firstName + " " + patient?.lastName });
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryById();
  }, [patient]);

  const handleDownload = async (filename) => {
    try {
      const response = await fetch(`http://localhost:4000/api/documents/download/${filename}`);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed");
    }
  };

  if (loading) return <p className="history-loading">Loading latest history...</p>;
  if (!report) return <p className="history-no-data">No history found.</p>;

  return (
    <div className="history-container">
      <h2 className="history-title">🗘 Latest Patient Report Summary</h2>

      <div className="history-info-grid">
        <div><strong>🕒 Date:</strong> {new Date(report.timestamp).toLocaleString()}</div>
        <div><strong>👤 Patient:</strong> {report.patientName}</div>
        <div><strong>🩺 Doctor:</strong> {report.doctorName}</div>
        <div><strong>📞 Phone:</strong> {report.phone}</div>
        <div><strong>📧 Email:</strong> {report.email}</div>
        <div><strong>♇ Gender:</strong> {report.gender}</div>
        <div><strong>🔍 Procedure:</strong> {report.procedure}</div>
      </div>

      <div className="history-section">
        <h3>📂 History</h3>
        <p>{report.history || "No history provided."}</p>
      </div>

      {(report.analysisResult || report.analysisResults?.length > 0) && (
  <div className="history-section">
    <h3>🧠 AI Medical Insights History</h3>
    <ul className="analysis-list">
      {[...(report.analysisResults || []), 
        ...(report.analysisResult ? [{
          input: report.analysisResult.input,
          result: report.analysisResult.result,
          date: report.timestamp || new Date()  // fallback to report timestamp
        }] : [])
      ]
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // latest first
      .map((item, idx) => (
        <li key={idx} className="analysis-item">
          <p><strong>🗓 {new Date(item.date).toLocaleString()}</strong></p>
          <p><strong>🧠 Input:</strong> {item.input}</p>
          <p><strong>💡 Insight:</strong> {item.result}</p>
          <hr />
        </li>
      ))}
    </ul>
  </div>
)}


      {report.documents?.length > 0 && (
        <div className="history-section">
          <h3>📎 Attached Documents</h3>
          <ul className="document-list">
            {report.documents.map((doc, idx) => (
              <li key={idx} className="document-item">
                <div className="document-details">
                  <p><strong>{doc.name}</strong> ({doc.type}, {doc.size})</p>
                  <p className="document-date">🗓 Uploaded: {doc.date}</p>
                </div>
                <div className="document-actions">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-link"
                  >
                    🔍 View
                  </a>
                  <button
                    onClick={() => handleDownload(doc.url, doc.name)}
                    className="download-link"
                  >
                    ⬇️ Download
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default History;
