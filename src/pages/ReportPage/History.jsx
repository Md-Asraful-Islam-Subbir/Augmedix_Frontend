import React, { useEffect, useState } from "react";
import "./History.css";

const History = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestReport = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/report/latest");
        const data = await res.json();
        setReport(data);
      } catch (err) {
        console.error("Failed to fetch latest report:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestReport();
  }, []);

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
      <h2 className="history-title">📝 Latest Patient Report Summary</h2>

      <div className="history-info-grid">
        <div><strong>🕒 Date:</strong> {new Date(report.timestamp).toLocaleString()}</div>
        <div><strong>👤 Patient:</strong> {report.patientName}</div>
        <div><strong>🩺 Doctor:</strong> {report.doctorName}</div>
        <div><strong>📞 Phone:</strong> {report.phone}</div>
        <div><strong>📧 Email:</strong> {report.email}</div>
        <div><strong>⚧ Gender:</strong> {report.gender}</div>
        <div><strong>🔍 Procedure:</strong> {report.procedure}</div>
      </div>

      <div className="history-section">
        <h3>📂 History</h3>
        <p>{report.history || "No history provided."}</p>
      </div>

      {report.analysisResult?.result && (
        <div className="history-section">
          <h3>🤖 AI Medical Insight</h3>
          <p>{report.analysisResult.result}</p>
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