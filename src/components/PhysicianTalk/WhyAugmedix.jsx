import React from 'react';
import './WhyAugmedix.css';
import { FaHandsHelping, FaFileMedicalAlt, FaLock } from 'react-icons/fa';

const WhyAugmedix = () => {
  return (
    <section className="why-augmedix">
      <div className="top-section">
        <h2 className="left-heading">Why Augmedix?</h2>
        <p className="right-paragraph">
          In 2013 Augmedix became the first to deliver ambient medical documentation to health systems, hospitals and clinics.
          A decade and 10 million notes later, we’ve learned a few things about what healthcare enterprises need.
        </p>
      </div>
      <div className="cards">
        <div className="card">
          <FaHandsHelping className="icon" />
          <h3>Self-service to full-service</h3>
          <p>
            Only Augmedix offers a suite of solutions with customizable levels of AI automation and human support so that you can
            meet clinicians where they are today while preparing your organization for the future.
          </p>
        </div>
        <div className="card">
          <FaFileMedicalAlt className="icon" />
          <h3>Specialties are our specialty</h3>
          <p>
            With a bespoke app for Emergency Medicine and AI fine-tuned for oncology and other specialties, Augmedix handles complex
            workflows, noisy environments, and intelligently curates data from the point of care.
          </p>
        </div>
        <div className="card">
          <FaLock className="icon" />
          <h3>Uncompromising security</h3>
          <p>
            With HITRUST certification and HIPAA compliance, Augmedix delivers enterprise-grade security to ensure that your
            organization’s data is fully protected and compliant.
          </p>
        </div>
      </div>
      
    </section>
  );
};

export default WhyAugmedix;
