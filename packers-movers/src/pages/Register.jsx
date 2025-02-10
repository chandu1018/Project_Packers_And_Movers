import React, { useState, useEffect } from "react";

import UserRegisterForm from "../components/UserRegisterForm";
import Footer from "../components/Footer";

import "../styles/form.css";
import Headerh from "../components/Headerh";

export default function RegisterPage() {
  return (
    <div className="register_page">
      <Headerh />
      <UserRegisterForm />
      <Footer />
    </div>
  );
}
