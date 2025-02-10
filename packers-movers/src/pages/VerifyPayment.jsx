import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/cards.css";
import "../styles/form.css";
import "../styles/editForm.css";
import VerifyPayment from "../components/VerifyPayment";

export default function Verify() {
  return (
    <div className="vendor-service-page">
      <Header />

      <VerifyPayment />

      <Footer />
    </div>
  );
}
