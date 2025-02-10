import React, { useState, useEffect } from "react";

import Footer from "../components/Footer";

import "../styles/login.css";
import LoginForm from "../components/LoginForm";
import Headerh from "../components/Headerh";

export default function RegisterPage() {
  return (
    <div className="login_page">
      <Headerh />
      <LoginForm />
      <Footer />
    </div>
  );
}
