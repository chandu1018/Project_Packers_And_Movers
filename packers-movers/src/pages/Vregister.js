import React, { useState, useEffect } from "react";
import VendorRegister from "../components/VendorRegister";
import Footer from "../components/Footer";
import "../styles/form.css";
import Headerh from "../components/Headerh";

export default function VendorRegisterPage() {
  return (
    <div className="register_page">
      <Headerh />
      <VendorRegister />
      <Footer />
    </div>
  );
}
