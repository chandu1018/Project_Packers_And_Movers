import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../Services/userService";
import { vendorSignin } from "../Services/vendorService";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.email) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = "Email is invalid";

    if (!formData.password) formErrors.password = "Password is required";
    else if (formData.password.length < 6)
      formErrors.password = "Password must be at least 6 characters long";

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors);
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      // Attempt User Login
      const userResponse = await signin(formData.email, formData.password);
      console.log("User Response:", userResponse);

      if (userResponse && userResponse.id) {
        // ✅ Successful User Login
        toast.success("Login successful as Customer!");
        sessionStorage.setItem("userName", userResponse.fullName);
        localStorage.setItem("userId", userResponse.id);
        navigate("/getquote");
        return; // Exit function if user login is successful
      }
    } catch (error) {
      console.log("User login failed, trying vendor login...");
    }

    // If User login fails, try Vendor login
    try {
      const vendorResponse = await vendorSignin(
        formData.email,
        formData.password
      );
      console.log("Vendor Response:", vendorResponse);

      if (vendorResponse && vendorResponse.id) {
        // ✅ Successful Vendor Login
        toast.success("Login successful as Vendor!");
        sessionStorage.setItem("vendorName", vendorResponse.bussinessName);
        localStorage.setItem("vendorId", vendorResponse.id);
        navigate("/vendor-Service-request");
        return; // Exit function if vendor login is successful
      } else {
        toast.error("Invalid credentials.");
      }
    } catch (error) {
      console.error("Vendor Login Error:", error);
      toast.error("Invalid credentials or server error.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
