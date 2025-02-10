import React from "react";
import Header from "../components/Header";

import Footer from "../components/Footer";

import "../styles/form.css";

import Vendor from "../components/VendorService";

export default function VendorPage() {
  return (
    <div className="register_page">
      <Header />
      <Vendor />
      <Footer />
    </div>
  );
}
