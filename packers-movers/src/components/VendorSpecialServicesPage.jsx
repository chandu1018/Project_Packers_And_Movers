import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../Services/config";
import { toast } from "react-toastify";
import "../styles/cards.css";

const VendorSpecialServicesPage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const vendorId = localStorage.getItem("vendorId");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${config.serverUrl}/VendorServices/getByid/${vendorId}`
        );
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services.");
      }
    };

    if (vendorId) {
      fetchServices();
    } else {
      toast.error("Vendor not logged in");
      navigate("/login");
    }
  }, [vendorId, navigate]);

  const handleEdit = (service) => {
    navigate("/edit-special-service", { state: { service } });
  };

  const handleDelete = async (serviceName) => {
    try {
      await axios.delete(`${config.serverUrl}/VendorServices/delete`, {
        data: { vendorid: vendorId, servicesName: serviceName },
      });
      setServices((prevServices) =>
        prevServices.filter((service) => service.servicesName !== serviceName)
      );
      toast.success("Service deleted successfully!");
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service.");
    }
  };

  return (
    <div className="vendor-special-services">
      <h2>Vendor Special Services</h2>
      <div className="services-grid">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service.servicesName} className="service-card small-card">
              <h3>{service.servicesName}</h3>
              <p>
                <strong>Price:</strong> ₹{service.price}
              </p>
              <div className="card-buttons">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(service)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(service.servicesName)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No special services available.</p>
        )}
      </div>
    </div>
  );
};

export default VendorSpecialServicesPage;
