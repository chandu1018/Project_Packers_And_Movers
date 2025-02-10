import React from "react";
import Header from "../components/Header";

import Footer from "../components/Footer";

import "../styles/form.css";

import Invoice from "../components/Invoice";

export default function InvoicePage() {
  return (
    <div className="register_page">
      <Header />
      <Invoice />
      <Footer />
    </div>
  );
}
