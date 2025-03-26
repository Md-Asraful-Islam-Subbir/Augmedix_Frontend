import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(StoreContext);
  const [userType, setUserType] = useState(""); // Store user type

  // Check localStorage for token and userType on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserType = localStorage.getItem("userType"); // Retrieve userType

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, [setToken]);

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType"); // Clear user type
    setToken("");
    setUserType("");
    navigate("/");
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="Logo" className="logo" /></Link>

      <ul className="navbar-menu">
        <li><Link to="/product-overview">Products</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/resources">Resources</Link></li>
      </ul>

      <div className="navbar-right">
        {!token ? (
          <button onClick={() => setShowLogin(true)} className="btn-signin">Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="navbar-profile-dropdown">
              {/* Appointment route depends on userType */}
              <li onClick={() => navigate(userType === "Admin" ? "/admin-dashboard" : "/view-appointment")}>
                <img src={assets.appointment} alt="Appointment" />
                <p>{userType === "Admin" ? "Admin Dashboard" : "Appointment"}</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
        {userType !== "Admin" && (
          <button className="btn-contact" onClick={() => navigate("/appointment-form")}>
            Contact Us
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
