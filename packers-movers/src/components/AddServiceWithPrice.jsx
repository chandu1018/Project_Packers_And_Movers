import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../Services/config";
function VendorServicePage() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [price, setPrice] = useState("");
  const [vendorId, setVendorId] = useState(null);

  useEffect(() => {
    const fetchVendorId = () => {
      const storedVendorId = localStorage.getItem("vendorId");
      if (storedVendorId) {
        setVendorId(storedVendorId);
      } else {
        toast.warn("Vendor not logged in. Please log in to continue.");
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get(`${config.serverUrl}/service/Get`);
        setServices(response.data);
      } catch (error) {
        toast.error("Error fetching services. Please try again later.");
        console.error("Error fetching services:", error);
      }
    };

    fetchVendorId();
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedService || !price || !vendorId) {
      toast.warn(
        "Please select a service, provide a price, and ensure you're logged in."
      );
      return;
    }

    const payload = {
      vendorid: vendorId,
      servicesid: selectedService,
      price: price,
    };

    try {
      const response = await axios.post(
        `${config.serverUrl}/VendorServices`,
        payload
      );
      handleApiResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  const handleApiResponse = (response) => {
    if (response.status === 200 || response.status === 201) {
      toast.success(
        response.data.message || "Service and price added successfully!"
      );
      resetForm();
    } else {
      handleError(response);
    }
  };

  const handleError = (error) => {
    console.error("Error submitting the service and price:", error);

    if (error.response) {
      const errorMessage =
        error.response.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } else if (error.request) {
      toast.error(
        "No response from server. Please check your internet connection."
      );
    } else {
      toast.error("Error submitting the service and price. Please try again.");
    }
  };

  const resetForm = () => {
    setSelectedService("");
    setPrice("");
  };

  return (
    <div className="form-container">
      <h2>Set Service Price</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Service</label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="form-control"
          >
            <option value="">--Select Service--</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.serviceName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
            placeholder="Enter price"
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default VendorServicePage;
