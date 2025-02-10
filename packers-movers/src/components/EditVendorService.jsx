import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../Services/config";
import { toast } from "react-toastify";
import "../styles/editForm.css";

const EditVendorService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vendorId = localStorage.getItem("vendorId");

  const [service, setService] = useState({
    id: "",
    shiftingType: "",
    shiftingTypeName: "",
    minWeight: "",
    maxWeight: "",
    pricePerKm: "",
  });

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!vendorId) {
        toast.error("Vendor ID not found");
        navigate("/main-vendor-service");
        return;
      }

      try {
        const response = await axios.get(
          `${config.serverUrl}/vendor-weight-pricing/vendorId/${vendorId}`
        );

        if (response.status === 200) {
          const selectedService = response.data.find(
            (s) =>
              s.id === parseInt(id, 10) && s.vendor === parseInt(vendorId, 10)
          );

          if (selectedService) {
            setService({
              id: selectedService.id,
              shiftingType: selectedService.shiftingType,
              shiftingTypeName: selectedService.shiftingTypeName,
              minWeight: selectedService.minWeight,
              maxWeight: selectedService.maxWeight,
              pricePerKm: selectedService.pricePerKm,
            });
          } else {
            toast.info("Service not found!");
            navigate("/main-vendor-service");
          }
        }
      } catch (error) {
        console.error("Error fetching service:", error);
        toast.error("Failed to fetch service details");
      }
    };

    fetchServiceDetails();
  }, [id, vendorId, navigate]);

  const handleChange = (e) => {
    setService((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${config.serverUrl}/vendor-weight-pricing/update?vendorPriceWeightId=${service.id}`,
        {
          minWeight: parseFloat(service.minWeight),
          maxWeight: parseFloat(service.maxWeight),
          pricePerKm: parseFloat(service.pricePerKm),
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        toast.success("Service updated successfully!");
        navigate(`/vendor-service-details/${service.shiftingTypeName}`);
      } else {
        toast.error("Failed to update service");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating the service"
      );
    }
  };

  return (
    <div className="edit-vendor-container">
      <h2>Edit Service</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Min Weight:
          <input
            type="number"
            name="minWeight"
            value={service.minWeight}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Max Weight:
          <input
            type="number"
            name="maxWeight"
            value={service.maxWeight}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price per Km:
          <input
            type="number"
            name="pricePerKm"
            value={service.pricePerKm}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Save</button>
        <br />
        <br />
        <button
          type="button"
          onClick={() =>
            navigate(`/vendor-service-details/${service.shiftingTypeName}`)
          }
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditVendorService;
