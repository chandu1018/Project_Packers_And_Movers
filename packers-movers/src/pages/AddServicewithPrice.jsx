
import Footer from "../components/Footer";
import "../styles/form.css";
import VendorServicePage from "../components/AddServiceWithPrice";
import Headerv from "../components/Headerv";

export default function AddServiceWithPrice() {
  return (
    <div className="forgot-page-container">
      <Headerv />
      <VendorServicePage />
      <Footer />
    </div>
  );
}
