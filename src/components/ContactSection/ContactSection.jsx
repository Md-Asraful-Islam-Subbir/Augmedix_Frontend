import React from 'react';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <section className="contact-section">
      <div className="contact-left">
        <h2>Ready to start your <br /> <span className="highlight">AI journey?</span></h2>
        <button className="talk-btn">Let's talk.</button>
        <p className="description">
          Submit your contact information, and a member of our team will be in touch
          to schedule a demo and explore your organization’s unique needs.
        </p>
        <p className="support-text">
          Looking for customer support?<br />
          Email <a href="mailto:support@ClinixNote.com">support@ClinixNote.com</a>.
        </p>
      </div>

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

  <button type="submit" className="submit-btn1">Submit</button>
</div>
        </form>
        
      </div>
      <div class="form-section_form-footnote">*By providing a telephone number and submitting the form you are consenting to be contacted by SMS text message. Message &amp; data rates may apply. Reply STOP to opt out of further messaging.</div>
    </section>
  );
};

export default ContactSection;
