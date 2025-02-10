import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../Services/config";
import "../styles/vendorCompare.css";

const ITEMS_PER_PAGE = 3;

const ComparisonPage = () => {
  const { state } = useLocation();
  const formData = state?.formData || {};
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [vendorServices, setVendorServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, vendorsData, vendorServicesData] =
          await Promise.all([
            axios.get(`${config.serverUrl}/service/Get`),
            axios.get(`${config.serverUrl}/Vendor/getAll`),
            axios.get(`${config.serverUrl}/VendorServices/getAll`),
          ]);

        setServices(servicesData.data);
        setVendors(vendorsData.data);
        setVendorServices(vendorServicesData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentVendors = vendors.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleConfirmVendor = (vendor) => {
    navigate("/select-services", {
      state: {
        formData,
        selectedVendor: vendor,
      },
    });
  };

  const isServiceProvided = (vendorId, serviceId) =>
    vendorServices.some(
      (vs) => vs.vendorid === vendorId && vs.servicesid === serviceId
    );

  return (
    <div className="container">
      <h1>Service Comparison</h1>

      {services.length > 0 && vendors.length > 0 ? (
        <div className="table">
          <div className="services-column">
            <h3>Services</h3>
            {services.map((service, index) => (
              <div key={service.id} className="service-item">
                <span>{index + 1}. </span>
                {service.serviceName}
              </div>
            ))}
          </div>

          {currentVendors.map((vendor) => (
            <div key={vendor.id} className="vendor-column">
              <h3>{vendor.bussinessName || "No Name Available"}</h3>
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`service-item ${
                    isServiceProvided(vendor.id, service.id) ? "yes" : "no"
                  }`}
                >
                  {isServiceProvided(vendor.id, service.id) ? "✔️" : "❌"}
                </div>
              ))}
              <button
                className="confirm-btn"
                onClick={() => handleConfirmVendor(vendor)}
              >
                Confirm
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}

      <div className="pagination">
        {Array.from(
          { length: Math.ceil(vendors.length / ITEMS_PER_PAGE) },
          (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={currentPage === idx + 1 ? "active" : ""}
            >
              {idx + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ComparisonPage;
