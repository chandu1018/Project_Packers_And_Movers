import React from "react";
import Header from "../components/Header";

import Footer from "../components/Footer";

import "../styles/form.css";

import ComparisonPage from "../components/VendorComparison";

export default function VendorCompares() {
  return (
    <div className="register_page">
      <Header />
      <ComparisonPage />
      <Footer />
    </div>
  );
}
