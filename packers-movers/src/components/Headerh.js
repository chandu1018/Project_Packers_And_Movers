import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/WhatsApp Image 2024-12-25 at 10.18.46 PM.jpeg";
import "../App.css";

function Headerh() {
  const [isActive, setIsActive] = useState(false);

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
              <Link to="/">Home</Link>
            </li>
            <li className="nav_link">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="nav_link">
              <Link to="/vendorregister">Vendor-Register</Link>
            </li>
            <li className="nav_link">
              <Link to="/register">Register</Link>
            </li>
            <li className="nav_link">
              <Link to="/login">Login</Link>
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

export default Headerh;
