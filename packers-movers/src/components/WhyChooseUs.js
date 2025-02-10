import OurPurposeImg from "../images/download.jpg";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

export default function WhyChooseUs() {
  return (
    <div className="mission">
      <div
        className="content_heading"
        data-aos="fade-in"
        data-aos-duration="1000"
      >
        <h3>OUR PURPOSE</h3>
      </div>
      <div className="mission_content">
        <div
          className="mission_img"
          data-aos="fade-in"
          data-aos-duration="1000"
        >
          <img src={OurPurposeImg} alt="MissionImg" />
        </div>
        <div
          className="mission_text"
          data-aos="fade-in"
          data-aos-duration="1000"
        >
          <p>
            Our purpose is to revolutionize the relocation experience by
            creating a platform that simplifies and streamlines the process of
            moving. We are committed to empowering individuals and businesses by
            connecting them with trustworthy and efficient packers and movers
            who understand the importance of reliability and quality. Through
            innovation and technology, we aim to bring transparency, trust, and
            convenience to every step of the relocation journey. By fostering
            strong relationships between users and vendors, we strive to provide
            a seamless experience where customers can confidently plan their
            moves and vendors can effectively grow their businesses.
          </p>

          <p>
            Through innovation and technology, we aim to bring transparency,
            trust, and convenience to every step of the relocation journey. By
            fostering strong relationships between users and vendors, we strive
            to provide a seamless experience where customers can confidently
            plan their moves and vendors can effectively grow their businesses.
          </p>

          <p>
            At the core of our mission is a commitment to sustainability and
            community. We believe in promoting eco-friendly practices and
            building a network of like-minded individuals and organizations who
            value quality, efficiency, and mutual growth. For us, relocation is
            more than just a service—it is an opportunity to make every move
            secure, stress-free, and successful.
          </p>
        </div>
      </div>
    </div>
  );
}
