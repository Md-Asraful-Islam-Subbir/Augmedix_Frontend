import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = ({ setShowLogin, showLogin }) => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(StoreContext);
  const [userType, setUserType] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserType = localStorage.getItem("userType");

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, [setToken]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setToken("");
    setUserType("");
    navigate("/");
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="Logo" className="logo" /></Link>

      <ul className={`navbar-menu ${menuOpen ? "active" : ""}`} style={{marginLeft:"10rem"}}>
        <li onClick={() => setMenuOpen(false)}><Link to="/product-overview">Products</Link></li>
        <li onClick={() => setMenuOpen(false)}><Link to="/about-us">About Us</Link></li>
        <li onClick={() => setMenuOpen(false)}><Link to="/resources">Resources</Link></li>

        {/* Only visible inside hamburger on small screens */}
        {!token ? (
          <li onClick={() => { setShowLogin(true); setMenuOpen(false); }}>
            <button className="btn-signin">Sign In</button>
          </li>
        ) : (
          <li onClick={() => {
            navigate(userType === "Admin" ? "/admin-dashboard" : "/view-appointment");
            setMenuOpen(false);
          }}>
            <button className="btn-signin">{userType === "Admin" ? "Admin Dashboard" : "Appointment"}</button>
          </li>
        )}


        {userType !== "Admin" && (
          <li onClick={() => {
            if (token) {
              navigate("/appointment-form");
            } else {
              navigate("/contact");
            }
            setMenuOpen(false);
          }}>
            <button className="btn-contact">Contact Us</button>
          </li>
        )}
      </ul>

      {/* Hamburger Toggle */}
      {!showLogin && (
  <div className={`navbar-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
    <span></span>
    <span></span>
    <span></span>
  </div>
)}
      {/* Profile section (desktop + mobile) */}
      <div className="navbar-right">
        {token && (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="navbar-profile-dropdown">
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
      </div>
    </div>
  );
};

export default Navbar;
