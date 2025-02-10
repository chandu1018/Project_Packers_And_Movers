import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/WhatsApp Image 2024-12-25 at 10.18.46 PM.jpeg";
import "../App.css";

function Header() {
  const [isActive, setIsActive] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUserName(sessionStorage.getItem("userName") || "");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUserName("");
    navigate("/");
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
              <Link to="/vendorregister">Vendor-Register</Link>
            </li>
            <li className="nav_link">
              <Link to="/register">Register</Link>
            </li>
            <li className="nav_link">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav_link">
              <Link to="/getquote">GetAQuote</Link>
            </li>
            <li className="nav_link">
              <Link to="/ServiceRequest">ServiceRequest</Link>
            </li>
            {userName && (
              <>
                <li className="nav_link">
                  <span>Welcome, {userName}</span>
                </li>
                <li className="nav_link">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="toggle" onClick={() => setIsActive(!isActive)}>
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

export default Header;
