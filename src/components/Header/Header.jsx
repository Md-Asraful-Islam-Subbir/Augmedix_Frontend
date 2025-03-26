import React from 'react';
import './Header.css';
import {assets} from '../../assets/assets'
function Header() {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Join Our Fast-Growing Healthtech Company</h2>
        <p>Augmedix takes care of the notes so that clinicians can connect with their patients.</p>
        <button>Let's Talk</button>
      </div>
      <div className="header-image">
        <img src={assets.header_img} alt="Header Visual" />
      </div>
    </div>
  );
}

export default Header;
