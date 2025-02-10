import AOS from "aos";

import "aos/dist/aos.css";
AOS.init();

export default function ContactInfo() {
  return (
    <div className="contact_info">
      <div
        className="contact_info_container"
        data-aos="fade-in"
        data-aos-duration="1000"
      >
        <div className="form_container contact_form">
          <h3>Contact Us</h3>
          <form className="form">
            <input
              placeholder="First Name *"
              name="Name"
              type="text"
              required
            />
            <input
              placeholder="Last Surname *"
              name="Surname"
              type="text"
              required
            />
            <input
              placeholder="Your Phone *"
              name="Phone"
              type="text"
              required
            />
            <input
              placeholder="Your Email *"
              name="Email"
              type="email"
              required
            />
            <textarea placeholder="Your Message" name="Message" />
            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="contact_info_content">
          <h1>Contact Info</h1>

          <p>Packers And Movers</p>

          <p>
            <i className="ri-map-pin-2-fill"></i> Packers And Movers Karad
            Maharastra, India
          </p>

          <p>
            <i class="ri-phone-fill"></i> +91 9970792572
          </p>

          <p>
            <i class="ri-mail-fill"></i> packersandmovers@sunbeaminfo.com
          </p>
        </div>
      </div>
    </div>
  );
}
