import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../Services/config";
import { toast } from "react-toastify";
import "../styles/cards.css";

const VendorServiceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serviceDetails, setServiceDetails] = useState([]);
  const vendorId = localStorage.getItem("vendorId");

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!vendorId) {
        toast.info("Vendor not logged in");
        navigate("/main-vendor-service");
        return;
      }

      try {
        const response = await axios.get(
          `${config.serverUrl}/vendor-weight-pricing/vendorId/${vendorId}`
        );

        if (response.status === 200) {
          const filteredServices = response.data.filter(
            (service) => service.shiftingTypeName === decodeURIComponent(id)
          );
          setServiceDetails(filteredServices);
        } else {
          toast.error("Failed to fetch service details");
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
        toast.error("An error occurred while fetching service details");
      }
    };

    fetchServiceDetails();
  }, [id, vendorId, navigate]);

  const handleEdit = (service) => {
    localStorage.setItem("selectedService", JSON.stringify(service));
    navigate(`/edit-vendor-service/${service.id}`);
  };

  const handleDelete = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `${config.serverUrl}/vendor-weight-pricing/delete/${serviceId}`
      );

      if (response.status === 200) {
        toast.success("Service deleted successfully!");
        setServiceDetails((prevServices) =>
          prevServices.filter((s) => s.id !== serviceId)
        );
      } else {
        toast.error("Failed to delete service");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("An error occurred while deleting the service");
    }
  };

  return (
    <div className="vendor-service-details">
      <h2 className="service-details-title">
        Shifting Details - {decodeURIComponent(id)}
      </h2>
      <div className="services-grid">
        {serviceDetails.length > 0 ? (
          serviceDetails.map((service) => (
            <div key={service.id} className="service-card">
              <h3>{service.shiftingTypeName}</h3>
              <p>
                <strong>Min Weight:</strong> {service.minWeight} kg
              </p>
              <p>
                <strong>Max Weight:</strong> {service.maxWeight} kg
              </p>
              <p>
                <strong>Price per Km:</strong> ₹{service.pricePerKm}
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
                  onClick={() => handleDelete(service.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No details available for this service.</p>
        )}
      </div>
    </div>
  );
};

export default VendorServiceDetailsPage;
