import React from 'react';
import './Culture.css';
import { assets } from '../../assets/assets';

const Culture = () => {
  return (
    <div className="culture-section">
      <h1>Culture and Careers</h1>
      <div className="container1">
        <div className="card2">
          <img src={assets.culture} alt="" />
          <h3 className="section-subheading">ClinixNote Culture</h3>
          <p>
            At ClinixNote, our culture is as open as our technology. We are built
            on innovation, transparency, and connection, and are focused on
            changing the way healthcare is delivered. The future of the global
            healthcare industry is driven by people, and it starts with you.
          </p>
          <a href="" className="arrow">Learn more
            <img src={assets.LeftArrow} alt="" />
          </a>
        </div>
        <div className="card3">
          <img src={assets.growth} alt="" />
          <h3 className="section-subheading">Build a Career at ClinixNote</h3>
          <p>
            We are always looking for new talent! Our frequently hiring
            departments include Engineering, Customer Support, and Operations,
            including Clinical AI Specialists. Join our growing team for the
            opportunity to grow your career and reshape the future of healthtech!
          </p>
          <a href="" className="arrow">Learn more
            <img src={assets.LeftArrow} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Culture;
