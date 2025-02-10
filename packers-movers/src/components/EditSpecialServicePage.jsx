import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../Services/config";
import "../styles/editForm.css";

const EditSpecialServicePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const vendorId = localStorage.getItem("vendorId");

  useEffect(() => {
    if (!state || !state.service) {
      toast.error("Service not found!");
      navigate("/vendor-special-services");
    } else {
      setService({ ...state.service });
      setNewPrice(state.service.price);
    }
  }, [state, navigate]);

  const handleSave = async () => {
    if (newPrice.trim() !== "" && !isNaN(newPrice)) {
      const updatedService = {
        vendorid: vendorId,
        servicesName: service.servicesName,
        price: parseFloat(newPrice),
      };

      try {
        await axios.put(
          `${config.serverUrl}/VendorServices/update-price`,
          updatedService
        );
        toast.success("Price updated successfully!");
        navigate("/vendor-special-services");
      } catch (error) {
        console.error("Error updating price:", error);
        toast.error("Failed to update price.");
      }
    } else {
      toast.warn("Please enter a valid price.");
    }
  };

  const handleCancel = () => {
    navigate("/vendor-special-services");
  };

  if (!service) {
    return null;
  }

  return (
    <div className="edit-service-container">
      <h2>Edit Service Price</h2>
      <div className="input-group">
        <label>Service Name:</label>
        <input type="text" value={service.servicesName} disabled />
      </div>
      <div className="input-group">
        <label>New Price:</label>
        <input
          type="text"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
      </div>
      <div className="button-group">
        <button className="save-btn" onClick={handleSave}>
          Save Price
        </button>
        <br />
        <button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditSpecialServicePage;
