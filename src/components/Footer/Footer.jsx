import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets'
const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <img
            src={assets.logo3}
            alt="ClinixNote Logo"
            className="logo-image"
          />
        </div>
        <div className="footer-sections">
          <div className="footer-column">
            <h4 className="footer-heading">Menu</h4>
            <ul className="footer-links">
              <li>About Us</li>
              <li>Resources</li>
              <li>Products</li>
              <li>Careers</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-links">
              <li>(880) 187 8507129</li>
              <li>info@ClinixNote.com</li>
            </ul>
            <button className="footer-button">Contact Us</button>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Customer Support</h4>
            <ul className="footer-links">
              <li>(888) 304 0450</li>
              <li>support@ClinixNote.com</li>
            </ul>
            <button className="footer-button">Sign In</button>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Follow Us</h4>
            <ul className="footer-links">
              <li>LinkedIn</li>
              <li>X</li>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-disclaimer">
        <p>
        The information and statements set forth herein are based on data collected from actual users and reflect the real-life experiences and opinions of such users, but are not intended to represent or guarantee that any user of our products and/or services will achieve the same or similar results. The experiences are personal to those particular users and a number of factors, which have not been taken into account, may affect your personal experience and results. We do not claim, and you should not assume, that all users will have the same experiences. The statements set forth herein do not form part of or constitute an offer or contract.
        </p>
        <p>© 2024 ClinixNote. All rights reserved</p>
        <p>
          <a href="#">Terms of Use</a> / <a href="#">Privacy Policy</a>
        </p>
        <div className="footer-certifications">
          <img
            src={assets.logo1}
            alt="HIPAA Logo"
            className="cert-logo"
          />
          <img
            src={assets.logo2}
            alt="HITRUST Logo"
            className="cert-logo"
          />
        </div>
      </div>
      <div className="footer-bottom-line"></div>
    </footer>
  )
}

export default Footer