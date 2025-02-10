import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="pre_footer">
        <div className="quick_links"></div>
        <div className="high_school">
          <h4>Address</h4>
          <p>
            <i className="ri-map-pin-2-fill"></i>'Anuda Chambers', 203 Shaniwar
            Peth, Near Gujar Hospital, Karad - 415 110, Dist. Satara, MH-INDIA.
          </p>
        </div>

        <div className="contact">
          <h4>Contact</h4>
          <p>
            <a href="https://www.sunbeaminfo.com/contact-us">
              <i className="ri-mail-fill"></i>
              packersandmovers@sunbeaminfo.com
            </a>
          </p>
          <p>
            <i className="ri-phone-fill"></i> +91 9970792572
          </p>
        </div>
      </div>

      <div className="main_footer">
        <p>
          <span id="currentYear"></span>
          Copyright &#169; 2024 | <Link to="/"> Packers And Movers </Link> | All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
