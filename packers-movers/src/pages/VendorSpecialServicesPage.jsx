import Footer from "../components/Footer";
import "../styles/cards.css";
import "../styles/form.css";
import "../styles/editForm.css";
import Headerv from "../components/Headerv";
import VendorSpecialServicesPage from "../components/VendorSpecialServicesPage";

export default function VendorSpecialService() {
  return (
    <div className="vendor-service-page">
      <Headerv />

      <VendorSpecialServicesPage />

      <Footer />
    </div>
  );
}
