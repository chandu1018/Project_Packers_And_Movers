import ContactUsBanner from "../components/ContactUsBanner";
import ContactInfo from "../components/ContactInfo";
import Footer from "../components/Footer";
import Headerh from "../components/Headerh";

export default function ContactPage() {
  return (
    <div className="contact_page">
      <Headerh />
      <ContactUsBanner />
      <ContactInfo />
      <Footer />
    </div>
  );
}
