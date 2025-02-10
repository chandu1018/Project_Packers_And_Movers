import AddServicePage from "../components/AddService";
import Footer from "../components/Footer";
import "../styles/form.css";
import Headerv from "../components/Headerv";

export default function AddService() {
  return (
    <div className="forgot-page-container">
      <Headerv />
      <AddServicePage />
      <Footer />
    </div>
  );
}
