import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const allSpecialServices = [
  { name: "Load & Drop Assistance", price: "Rs. 100" },
  { name: "Complete Packing Support", price: "Rs. 200" },
  { name: "Express Services", price: "Rs. 300" },
  { name: "Special Care Handling", price: "Rs. 250" },
  { name: "Storage on Demand", price: "Rs. 350" },
  { name: "Goods Insurance", price: "Rs. 50" },
];

const AddSpecialService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const availableServices = location.state?.availableServices || [];

  const [selectedService, setSelectedService] = useState("");

  const handleAddService = () => {
    if (!selectedService) {
      toast.warn("Please select a service to add.");
      return;
    }

    const newService = allSpecialServices.find(
      (s) => s.name === selectedService
    );

    if (newService) {
      toast.success(`${selectedService} added successfully!`);

      navigate("/vendor-special-services", {
        state: { newService },
      });
    } else {
      toast.error("Selected service not found.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <h2>Add Special Service</h2>

      {availableServices.length > 0 ? (
        <>
          <div style={{ marginBottom: "20px" }}>
            <label>Select Service: </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              style={{ padding: "8px", width: "100%", marginTop: "5px" }}
            >
              <option value="">-- Select a Service --</option>
              {availableServices.map((serviceName, index) => (
                <option key={index} value={serviceName}>
                  {serviceName}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddService}
            style={{
              padding: "10px 15px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Add Service
          </button>
        </>
      ) : (
        <p style={{ color: "red" }}>No services available to add.</p>
      )}
    </div>
  );
};

export default AddSpecialService;
