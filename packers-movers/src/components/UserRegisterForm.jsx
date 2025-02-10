import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUser } from "../Services/userService";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async () => {
    const response = await createUser(formData);

    toast.success("User registered successfully!");
    setFormData({
      fullName: "",
      email: "",
      password: "",
      phone: "",
      city: "",
      address: "",
    });
    navigate("/login");
  };

  return (
    <div className="form-container">
      <h2>User Registration</h2>
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

export default UserRegister;
