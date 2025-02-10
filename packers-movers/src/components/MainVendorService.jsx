import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../Services/config";
import "../styles/vendorServices.css";

const VendorServicesPage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const vendorId = localStorage.getItem("vendorId");

  useEffect(() => {
    if (!vendorId) {
      alert("Vendor not logged in");
      navigate("/login");
      return;
    }

    const fetchServices = async () => {
      try {
        const { data } = await axios.get(
          `${config.serverUrl}/vendor-weight-pricing/vendorId/${vendorId}`
        );
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
        alert("An error occurred while fetching services");
      }
    };

    fetchServices();
  }, [vendorId, navigate]);

  const groupedServices = services.reduce((acc, { shiftingTypeName }) => {
    acc[shiftingTypeName] = { shiftingTypeName };
    return acc;
  }, {});

  return (
    <div className="vendor-services-container">
      <h2>Vendor Shiftings</h2>
      <div className="vendor-services-grid">
        {Object.keys(groupedServices).length > 0 ? (
          Object.keys(groupedServices).map((shiftingTypeName) => (
            <div
              key={shiftingTypeName}
              className="vendor-service-card"
              onClick={() =>
                navigate(
                  `/vendor-service-details/${encodeURIComponent(
                    shiftingTypeName
                  )}`
                )
              }
            >
              <h3>{shiftingTypeName}</h3>
              <p>Click to see details</p>
            </div>
          ))
        ) : (
          <p>No services found</p>
        )}
      </div>
    </div>
  );
};

export default VendorServicesPage;
