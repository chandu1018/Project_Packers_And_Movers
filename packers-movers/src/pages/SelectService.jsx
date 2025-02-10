import React from "react";
import Header from "../components/Header";

import Footer from "../components/Footer";

import "../styles/form.css";

import SelectServices from "../components/SelectServices";

export default function SelectService() {
  return (
    <div className="register_page">
      <Header />
      <SelectServices />
      <Footer />
    </div>
  );
}
