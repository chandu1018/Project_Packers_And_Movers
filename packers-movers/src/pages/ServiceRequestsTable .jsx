import React from "react";

import Footer from "../components/Footer";

import "../styles/form.css";

import ServiceRequestsTable from "../components/ServiceRequestsTable ";
import Header from "../components/Header";

export default function ServiceRequest() {
  return (
    <div className="register_page">
      <Header />
      <ServiceRequestsTable />
      <Footer />
    </div>
  );
}
