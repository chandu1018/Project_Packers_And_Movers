import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/vendor.css";
function Vendor() {
  const [features, setFeatures] = useState([
    "Packing and Unpacking",
    "Loading and Unloading",
    "Delicate Item Protection",
    "Premium Express Services",
    "Temporary Storage Solution",
  ]);

  const [vendor, setVendor] = useState({
    id: null,
    name: "",
    services: new Array(5).fill(false),
  });

  const [newService, setNewService] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const vendorId = sessionStorage.getItem("vendorId");
    if (vendorId) {
      setVendor({
        id: vendorId,
        name: `Vendor ${vendorId}`,
        services: new Array(features.length).fill(false),
      });
    }
  }, [features.length]);

  const handleServiceToggle = (index) => {
    setVendor((prevVendor) => {
      const updatedServices = prevVendor.services.map((service, i) =>
        i === index ? !service : service
      );
      sessionStorage.setItem("vendorServices", JSON.stringify(updatedServices));
      return { ...prevVendor, services: updatedServices };
    });
  };

  const handleAddService = () => {
    if (newService.trim() && !features.includes(newService.trim())) {
      setFeatures((prevFeatures) => [...prevFeatures, newService.trim()]);
      setVendor((prevVendor) => ({
        ...prevVendor,
        services: [...prevVendor.services, false],
      }));
      setNewService("");
    }
  };

  const handleSubmit = () => {
    const selectedServices = {
      features,
      services: vendor.services,
    };
    sessionStorage.setItem(
      "selectedServices",
      JSON.stringify(selectedServices)
    );
    console.log("Selected Services:", selectedServices);
    navigate("/servicesum");
  };

  return (
    <div className="container">
      <h1>Services</h1>
      <div className="table">
        <div className="features-column">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              {feature}
            </div>
          ))}
        </div>

        <div className="vendor-column">
          {vendor.services.map((service, index) => (
            <div
              key={index}
              className={`service-item ${service ? "yes" : "no"}`}
              onClick={() => handleServiceToggle(index)}
            >
              {service ? "Yes" : "No"}
            </div>
          ))}
        </div>
      </div>

      <div className="add-service">
        <input
          type="text"
          placeholder="Add new service..."
          className="add-input"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddService();
          }}
        />
        <button className="add-btn" onClick={handleAddService}>
          ADD
        </button>
      </div>

      <button className="add-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Vendor;
