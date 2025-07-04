import React from 'react';
import './About.css';
import { assets } from '../../assets/assets';
import ContactSection from '../../components/ContactSection/ContactSection'
const About = () => {
  return (
    <div>
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
            <img src={assets.Prompt} alt="" className="image1" />
          </div>
        </div>

        {/* Core Values Section */}
        <section className="core-values-section" id="career">
          <div className="core-values-container">
            <div className="core-values-header">
              <h2 className="section-heading">ClinixNote core values</h2>
              <p>
                These are some of the values we live by, as a company. We work by them, too: we're building a platform and products we believe in — knowing there is real value to be gained from helping people, wherever they are, simplify whatever it is that they do and bring more of themselves to their work.
              </p>
            </div>

            {/* Value 1 */}
            <div className="value-row">
              <div className="value-image">
                <img 
                  src="https://Augmedix.com.bd/wp-content/uploads/2020/06/Do-work-that-matter.png" 
                  alt="Do work that matters" 
                  className="img-fluid" 
                />
              </div>
              <div className="value-content">
                <h3 className="section-subheading">Do work that matters</h3>
                <p>
                  ClinixNote is a mission-driven company set on a course to improve the lives of doctors, to improve the care patients receive, and to create high-value jobs in countries that need them most. We take ownership of what we do and we're driven to make an impact. When something needs to get done, we don't wait for someone else to take the lead, we roll up our sleeves and get it done.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="value-row reverse">
              <div className="value-image">
                <img 
                  src="https://Augmedix.com.bd/wp-content/uploads/2020/06/Collaborate-first-escalate-later.png" 
                  alt="Collaborate first escalate later" 
                  className="img-fluid" 
                />
              </div>
              <div className="value-content">
                <h3 className="section-subheading">Collaborate first escalate later</h3>
                <p>
                  Stop. Collaborate and listen. We are #OneClinixNote and we pride ourselves on working together to solve problems before sounding the alarm. We believe in transparency and going to the source to solve problems. We trust each other's expertise and we work together to find a solution. We know that we all make mistakes, but we learn and work together to move forward.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="value-row">
              <div className="value-image">
                <img 
                  src="https://Augmedix.com.bd/wp-content/uploads/2020/06/Be-a-beast.png" 
                  alt="Be a beast" 
                  className="img-fluid" 
                />
              </div>
              <div className="value-content">
                <h3 className="section-subheading">Be a beast</h3>
                <p>
                  We go above and beyond our job descriptions to get work done. We're constantly breaking things and rebuilding them in smarter ways. And when the going gets tough, we embrace the challenge. We're always learning from each other and rewarding each other for stepping up.
                </p>
              </div>
            </div>

            {/* Value 4 */}
            <div className="value-row reverse">
              <div className="value-image">
                <img 
                  src="https://Augmedix.com.bd/wp-content/uploads/2020/06/Let-doctor-be-doctor.png" 
                  alt="Let doctors be doctors" 
                  className="img-fluid" 
                />
              </div>
              <div className="value-content">
                <h3 className="section-subheading">Let doctors be doctors</h3>
                <p>
                  We are obsessed with our customers, our partners, and the quality we deliver every second of every day. We don't take shortcuts that compromise the quality of our work and we constantly reinvent processes to create more value for our partners.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid-container">
          {/* Left Side - Text */}
          <div className="text-content">
            <h1 className="title" >
              Build a career <br />
              <span className="subtitle">at ClinixNote</span>
            </h1>
            <p className="description">
              Clinician by clinician, we're changing the way healthcare is delivered.
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
            <img src={assets.Prompt2} alt="Career at ClinixNote" className="image1" />
          </div>
        </div>
      </div>
    </div>
    <br /> <br />
    <ContactSection/>
    </div>
  );
};

export default About;