import AOS from "aos";

import ContactUsBannerImg from "../images/contact.jpg";

import "aos/dist/aos.css";
AOS.init();

export default function ContactInfo() {
  return (
    <div className="contact_info">
      <img src={ContactUsBannerImg} alt="ContactUsBannerImg" width="70%" />
    </div>
  );
}
