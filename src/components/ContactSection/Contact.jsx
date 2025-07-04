import React from 'react';
import './Contact.css';
import { assets } from '../../assets/assets';

function Contact() {
  return (
    <div>
   <div className="contact-page">
      <div className="contact-container">
        {/* Left side - Text content */}
        <div className="contact-content">
          <h1 className="contact-title">CONTACT US</h1>
          
          <div className="text-section">
            <h2 className="contact-subtitle">
              Ready to start your AI journey?<br />
               <span className="highlight-blue">Let's talk.</span>
            </h2>
            <p className="contact-text">
              Submit your contact information, and a member of our team will be in touch to schedule a demo and explore your organization's unique needs.
            </p>
          </div>
          
          <div className="support-section">
            <p className="contact-text">
              Looking for customer support?<br />
              Email <a href="mailto:support@ClinixNote.com" className="email-link">support@ClinixNote.com</a>.
            </p>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="image-container">
          <img src={assets.contactImage} alt="Contact ClinixNote" className="contact-image" />
        </div>
      </div>
    </div>
    <div className="contact-form-wrapper">
    <div className="contact-form">
  <form>
    <input type="text" placeholder="First Name*" required />
    <input type="text" placeholder="Last Name*" required />
    <input type="text" placeholder="Company*" required />
    <input type="text" placeholder="Job Title*" required />
    <input type="email" placeholder="Business Email*" required />
    <input type="tel" placeholder="Phone Number*" required />

    <select required>
      <option value="">Which best describes your organization?*</option>
      <option value="hospital">Hospital</option>
      <option value="clinic">Clinic</option>
      <option value="private">Private Practice</option>
    </select>

    <select required>
      <option value="">How did you hear about ClinixNote?*</option>
      <option value="google">Google</option>
      <option value="linkedin">LinkedIn</option>
      <option value="referral">Referral</option>
    </select>

    <select required>
      <option value="">Request Type*</option>
      <option value="demo">Schedule Demo</option>
      <option value="info">More Info</option>
    </select>

    <div className="recaptcha-and-submit">
      <div className="recaptcha-wrapper">
        <div className="recaptcha-box">
          <input type="checkbox" id="recaptcha" />
          <label htmlFor="recaptcha">I'm not a robot</label>
          <img
            src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
            alt="reCAPTCHA logo"
            className="recaptcha-icon"
          />
        </div>
      </div>

      <button type="submit" className="submit-btn">Submit</button>
    </div>
  </form>
</div>

</div>
<div class="form-section_form-footnote1">*By providing a telephone number and submitting the form you are consenting to be contacted by SMS text message. Message &amp; data rates may apply. Reply STOP to opt out of further messaging.</div>
    </div>
  );
}

export default Contact;