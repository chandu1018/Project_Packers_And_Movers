import React from "react";
import "../styles/vendor.css";

const ServiceSummary = () => {
  const selectedServices = JSON.parse(
    sessionStorage.getItem("selectedServices")
  );

  if (!selectedServices) {
    return <div className="container">No services selected</div>;
  }

  const { features, services } = selectedServices;

  return (
    <div className="container">
      <h1>Selected Services</h1>
      <div className="table">
        <div className="features-column">
          <h3>Features</h3>
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              {feature}
            </div>
          ))}
        </div>

        <div className="vendor-column">
          <h3>Selected Status</h3>
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-item ${service ? "yes" : "no"}`}
            >
              {service ? "Yes" : "No"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSummary;
