import FantasyFoundationImg from "../images/fantasy-foundation-photo.png";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

export default function Welcome() {
  return (
    <div className="vision">
      <div
        className="content_heading"
        data-aos="fade-in"
        data-aos-duration="1000"
      >
        <h3>Welcome to Fantasy Foundation</h3>
      </div>
      <div className="vision_content">
        <div
          className="vision_text"
          data-aos="fade-in"
          data-aos-duration="1000"
        >
          <p>
            FANTASY Foundation is a non-profit organization situated in Solapur,
            Maharashtra. We started our journey with the dream of social
            upliftment and equality. Women empowerment is our prime concern. To
            give a proper life to the neglected people of our society, we
            fought, fight, and will fight.
          </p>
          <p>
            Fantasy Foundation work with 11 members with the management. FANTASY
            Foundation is registered with the Registrar of Societies under the
            1860 act of society registration and the type of NGO is Registered
            Societies (Non-Government) and the Registration Number is 29405. The
            city and state of registration are Solapur and MAHARASHTRA. Our
            Unique Id of VO/NGO is MH/2021/0272891. The date of registration is
            17-04-2018.
          </p>
          <p>
            Fantasy Foundation has its division working with an call center
            based in Pune, Solapur, Bangalore , Bijapur and works PAN India.
            Fantasy Foundation' s call centre division is well equipped with
            state-of-the-art Technology with the capacity for fast ramp-up and
            rollout of new campaigns.
          </p>
          <p>
            We cater to various processes such as Customer care, tech support,
            Debt collection, Surveys, corporate reception and messaging in the
            Inbound call center domain. In the outbound call center we cater to
            direct telemarketing, Upsell/cross sell, direct mail appointment
            scheduling and surveys.
          </p>
        </div>
        <div className="vision_img" data-aos="fade-in" data-aos-duration="1000">
          <img src={FantasyFoundationImg} alt="FantasyFoundationImg" />
        </div>
      </div>
    </div>
  );
}
