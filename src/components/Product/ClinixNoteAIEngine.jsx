import React from 'react';
import './ClinixNoteAIEngine.css';

const ClinixNoteAIEngine = () => {
  return (
    <div className="ai-engine-container">
      <h1 className="main-title">The ClinixNote Clinical AI Engine</h1>
      
      <div className="process-flow">
        <div className="process-step">
          <div className="step-icon">1</div>
          <div className="step-content">
            <h3>Automatic Speech Recognition (ASR)</h3>
            <p>captures the natural conversation between the patient and the physician.</p>
          </div>
        </div>
        
        <div className="arrow-down"></div>
        
        <div className="process-step">
          <div className="step-icon">2</div>
          <div className="step-content">
            <h3>ClinixNote Natural Language Processing (NLP)</h3>
            <p>including foundational and specialty-specific fine-tuned Large Language Models (LLMs), make multiple passes to generate a natural-sounding note.</p>
          </div>
        </div>
        
        <div className="arrow-down"></div>
        
        <div className="process-step">
          <div className="step-icon">3</div>
          <div className="step-content">
            <h3>Additional NLP models</h3>
            <p>generate structured data for note review and analytical purposes.</p>
          </div>
        </div>
        
        <div className="arrow-down"></div>
        
        <div className="process-step">
          <div className="step-icon">4</div>
          <div className="step-content">
            <h3>EHR Integration</h3>
            <p>The medical note and structured data are uploaded to the EHR for review and sign-off by the doctor.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinixNoteAIEngine;