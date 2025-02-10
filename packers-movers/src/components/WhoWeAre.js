import { Link } from "react-router-dom";

import WhoWeAreImg from "../images/ourpurpose.png";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

export default function WhoWeAre() {
  return (
    <div className="whoweare_container">
      <div className="whoweare_content">
        <h1 data-aos="fade-in" data-aos-duration="1000">
          Who We Are?
        </h1>
        <p data-aos="fade-in" data-aos-duration="2000">
          Who We Are We are a trusted and innovative platform that connects
          individuals and businesses with reliable packing and moving service
          providers. Our mission is to simplify the relocation process by
          offering a seamless experience where users can easily find, compare,
          and book services tailored to their needs. With a network of verified
          vendors and a commitment to quality, we provide a wide range of
          solutions, including residential and commercial moves, premium express
          deliveries, door-to-door services, and secure storage options.
        </p>
        <p>MAKE IN INDIA</p>
        <div
          className="know_more_btn"
          data-aos="fade-in"
          data-aos-duration="1000"
        >
          <Link to="/contact">Know More</Link>
        </div>
      </div>

      <div
        className="whoweare_image"
        data-aos="fade-in"
        data-aos-duration="1000"
      >
        <img src={WhoWeAreImg} alt="FantasyFoundationImg" />
      </div>
    </div>
  );
}
