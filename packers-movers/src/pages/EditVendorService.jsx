
import EditVendorService from "../components/EditVendorService";
import Footer from "../components/Footer";
import "../styles/cards.css";
import "../styles/form.css";
import "../styles/editForm.css";
import Headerv from "../components/Headerv";

export default function EditVS() {
  return (
    <div className="vendor-service-page">
      <Headerv />

      <EditVendorService />

      <Footer />
    </div>
  );
}
