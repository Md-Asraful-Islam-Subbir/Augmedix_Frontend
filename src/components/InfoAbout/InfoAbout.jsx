import React from 'react';
import './InfoAbout.css';

const InfoAbout = () => {
  return (
    <div className="info_about">
      <div className="container">
        <div className="text-center">
          <h2 className="section-heading">What is Augmedix?</h2>
        </div>

        <div className="content">
          <div className="video-container">
            <iframe
              className="video"
              src="https://www.youtube.com/embed/wvFnPOPtQDY"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="text-container">
            <p className="about-text">
              Augmedix’s AI-powered products turn natural doctor-patient conversations into comprehensive medical notes to allow doctors to focus on what matters most: patient care. Augmedix offers high-touch levels of service where Clinical AI Specialists are involved to ensure the quality of medical documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoAbout;
