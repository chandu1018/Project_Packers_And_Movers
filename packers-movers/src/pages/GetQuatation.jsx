import React from "react";
import Header from "../components/Header";
import GetQuote from "../components/GetQuote";
import Footer from "../components/Footer";
import "../styles/GetQuote.css";

export default function GetQuot() {
  return (
    <div className="register_page">
      <Header />
      <div className="form-container">
        <GetQuote />
      </div>
      <Footer />
    </div>
  );
}
