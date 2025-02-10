import VendorServiceDetailsPage from "../components/VendorServiceDetailsPage";
import Footer from "../components/Footer";
import "../styles/cards.css";
import "../styles/form.css";
import "../styles/editForm.css";
import Headerv from "../components/Headerv";

export default function DetailServices() {
  return (
    <div className="vendor-service-page">
      <Headerv />

      <VendorServiceDetailsPage />

      <Footer />
    </div>
  );
}
