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

    if (storedToken) setToken(storedToken);
    if (storedUserType) setUserType(storedUserType);
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

      {/* Hamburger menu toggle */}
      <div className={`navbar-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center">
        <ul className="navbar-menu-left">
          <li><Link to="/product-overview">Products</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/resources">Resources</Link></li>
        </ul>
      </div>

      <div className="navbar-right">
        {!token ? (
          <button className="btn-signin" onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
         <button
  className="btn-signin"
  onClick={() =>
    navigate(
      userType === "Admin"
        ? "/admin-dashboard"
        : userType === "Doctor"
        ? "/doctor-dashboard"
        : "/view-appointment"
    )
  }
>
            {userType === "Admin"
  ? "Admin Dashboard"
  : userType === "Doctor"
  ? "Doctor Dashboard"
  : "View Appointment"}

          </button>
        )}

        {userType !== "Admin" && (
          <button
            className="btn-contact"
            onClick={() => navigate(token ? "/appointment-form" : "/contact")}
          >
            Contact Us
          </button>
        )}

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

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <ul className="mobile-menu">
          <li onClick={() => { setMenuOpen(false); navigate("/product-overview"); }}>Products</li>
          <li onClick={() => { setMenuOpen(false); navigate("/about-us"); }}>About Us</li>
          <li onClick={() => { setMenuOpen(false); navigate("/resources"); }}>Resources</li>

          {!token ? (
            <li onClick={() => { setShowLogin(true); setMenuOpen(false); }}>
              <button className="btn-signin">Sign In</button>
            </li>
          ) : (
            <li onClick={() => {
              navigate(userType === "Admin" ? "/admin-dashboard" : "/view-appointment");
              setMenuOpen(false);
            }}>
              <button className="btn-signin">
                {userType === "Admin" ? "Admin Dashboard" : "Appointment"}
              </button>
            </li>
          )}

          {userType !== "Admin" && (
            <li onClick={() => {
              navigate(token ? "/appointment-form" : "/contact");
              setMenuOpen(false);
            }}>
              <button className="btn-contact">Contact Us</button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
