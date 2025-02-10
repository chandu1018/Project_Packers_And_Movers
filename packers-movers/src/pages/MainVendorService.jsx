
import VendorServicesPage from "../components/MainVendorService";
import Footer from "../components/Footer";
import "../styles/cards.css";
import "../styles/form.css";
import "../styles/editForm.css";
import Headerv from "../components/Headerv";

export default function MainVendorService() {
  return (
    <div className="vendor-service-page">
      <Headerv />

      <VendorServicesPage />

      <Footer />
    </div>
  );
}
