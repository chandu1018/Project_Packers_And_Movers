import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/WhatsApp Image 2024-12-25 at 10.18.46 PM.jpeg";
import "../App.css";

function Headerv() {
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();

    navigate("/");
  };

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <div className={`header ${isActive ? "active" : ""}`}>
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="navbar">
          <ul className="nav_links">
            <li className="nav_link">
              <Link to="/vendorregister">Vendor-Register</Link>
            </li>

            <li className="nav_link">
              <Link to="/login">Login</Link>
            </li>

            <li className="nav_link">
              <Link to="/add-service">AddSHifting</Link>
            </li>
            <li className="nav_link">
              <Link to="/add-service-price">AddServicePrice</Link>
            </li>
            <li className="nav_link">
              <Link to="/vendor-special-services">SeeServices</Link>
            </li>

            <li className="nav_link">
              <Link to="/main-vendor-service">Shifting</Link>
            </li>
            <li className="nav_link">
              <Link to="/vendor-Service-request">Service Request</Link>
            </li>
            <li className="nav_link">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>

        <div className="toggle" onClick={handleToggle}>
          <div className="menu_icon">
            <span className="top"></span>
            <span className="middle"></span>
            <span className="end"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Headerv;
