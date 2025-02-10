import React from "react";
import Header from "../components/Header";

import Footer from "../components/Footer";

import "../styles/form.css";

import ServiceSummary from "../components/ServiceSummary";

export default function ServicePage() {
  return (
    <div >
      <Header />
      <ServiceSummary />
      <Footer />
    </div>
  );
}
