import React from 'react'
import './About.css'
import {assets} from '../../assets/assets'
const About = () => {
  return (
    <div className="page-container">
    <div className="content-wrapper">
    <div className="grid-container">
    <div className="text-content1">
    <h1 className="title1">
    Our Mission
      <br />
    </h1>
    <p className="description1">
    We are on a mission to rehumanize the clinician-patient relationship and address the largest pain point in the US healthcare system – medical documentation.
    </p>
  </div>
  <div className="image-container1">
            <img src={assets.Prompt} alt=""  className="image" />
          </div>
        </div>
        <br/><br/><br/><br/><br/><br/>
        <div className="grid-container">
    {/* Left Side - Text */}
    <div className="text-content">
        <h1 className="title">
            Build a career <br />
            <span className="subtitle">at Augmedix</span>
        </h1>
        <p className="description">
            Clinician by clinician, we’re changing the way healthcare is delivered.
            We are building a world where all clinicians 
            can focus on what matters most: seeing their patient, not the technology.
        </p>
        <p className="description">
            The future of healthcare is driven by people and it starts with you.
        </p>
        <button className="explore-button">Join The Future Healthcare</button>
    </div>

    {/* Right Side - Image */}
    <div className="image-container">
        <img src={assets.Prompt2} alt="Career at Augmedix" className="image" />
    </div>
</div>

</div>
</div>

  )
}

export default About