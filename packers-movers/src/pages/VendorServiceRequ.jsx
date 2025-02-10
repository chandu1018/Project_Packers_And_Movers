import Footer from "../components/Footer";
import "../styles/cards.css";
import "../styles/form.css";
import "../styles/editForm.css";
import Headerv from "../components/Headerv";
import VendorServiceRequestsTable from "../components/VendorServiceReq";

export default function VendorServiceReq() {
  return (
    <div className="vendor-service-page">
      <Headerv />

      <VendorServiceRequestsTable />

      <Footer />
    </div>
  );
}
