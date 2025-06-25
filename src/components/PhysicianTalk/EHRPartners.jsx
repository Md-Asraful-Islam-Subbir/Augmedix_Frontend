import React from 'react';
import './EHRPartners.css';
import { assets } from '../../assets/assets';

const EHRPartners = () => {
  return (
    <div className="ehr-partners-container">
      <h1 className="ehr-main-title">We work with popular EHRs</h1>
      
      <div className="ehr-group-header">
              <img src={assets.capture} alt="Vathenahealth" className="ehr-logo" />
            </div>
    </div>
  );
};

export default EHRPartners;