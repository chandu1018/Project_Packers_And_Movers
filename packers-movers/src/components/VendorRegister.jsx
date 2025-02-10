import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerVendor } from "../Services/vendorService";

const VendorRegister = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    bussinessName: "",
    email: "",
    password: "",
    mobileNo: "",
    address: "",
    cin: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    for (const key in formData) {
      if (!formData[key]) {
        toast.warn(`Please enter ${key.replace(/([A-Z])/g, " $1")}`);
        return false;
      }
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const response = await registerVendor(formData);
      console.log("API Response:", response);

      if (response.status === "success") {
        toast.success("Vendor registered successfully");
        setFormData({
          ownerName: "",
          bussinessName: "",
          email: "",
          password: "",
          mobileNo: "",
          address: "",
          cin: "",
        });
        navigate("/login");
      } else {
        toast.error(response.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Vendor Registration</h2>
      {Object.keys(formData).map((field) => (
        <div className="form-group" key={field}>
          <label>{field.replace(/([A-Z])/g, " $1")}</label>
          <input
            type={field === "password" ? "password" : "text"}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      ))}
      <button onClick={handleRegister} className="btn btn-success">
        Register
      </button>
    </div>
  );
};

export default VendorRegister;
