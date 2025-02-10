import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { config } from "../Services/config";
import "../styles/form.css";

function AddServicePage() {
  const [shiftingTypes, setShiftingTypes] = useState([]);
  const [shiftingType, setShiftingType] = useState("");
  const [minWeight, setMinWeight] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [pricePerKm, setPricePerKm] = useState("");
  const [errors, setErrors] = useState({});
  const vendorId = localStorage.getItem("vendorId");

  useEffect(() => {
    const fetchShiftingTypes = async () => {
      try {
        const response = await axios.get(`${config.serverUrl}/Shifting/GetAll`);
        setShiftingTypes(response.data);
      } catch (error) {
        console.error("Error fetching shifting types:", error);
        toast.error("Failed to load shifting types.");
      }
    };

    fetchShiftingTypes();
  }, []);

  const isValidNumber = (value) => {
    return !isNaN(value) && value !== "" && value >= 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};
    if (!shiftingType) formErrors.shiftingType = "Shifting type is required";
    if (!minWeight) formErrors.minWeight = "Min weight is required";
    if (!maxWeight) formErrors.maxWeight = "Max weight is required";
    if (!pricePerKm) formErrors.pricePerKm = "Price per km is required";

    if (!isValidNumber(minWeight))
      formErrors.minWeight = "Min weight must be a valid number";
    if (!isValidNumber(maxWeight))
      formErrors.maxWeight = "Max weight must be a valid number";
    if (!isValidNumber(pricePerKm))
      formErrors.pricePerKm = "Price per km must be a valid number";

    if (!vendorId) {
      toast.error("Vendor ID not found. Please log in again.");
      return;
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const payload = {
          vendor: parseInt(vendorId),
          shiftingType: parseInt(shiftingType),
          minWeight: parseFloat(minWeight),
          maxWeight: parseFloat(maxWeight),
          pricePerKm: parseFloat(pricePerKm),
        };

        await axios.post(
          `${config.serverUrl}/vendor-weight-pricing/add`,
          payload
        );
        toast.success("Service added successfully!");
        setShiftingType("");
        setMinWeight("");
        setMaxWeight("");
        setPricePerKm("");
      } catch (error) {
        console.error("Error adding service:", error);
        toast.error("Failed to add service.");
      }
    } else {
      toast.error("Please check your inputs.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Shifting</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Shifting Type</label>
          <select
            name="shiftingType"
            value={shiftingType}
            onChange={(e) => setShiftingType(e.target.value)}
            className="form-control"
          >
            <option value="">Select Shifting Type</option>
            {shiftingTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.shiftingTypeName}
              </option>
            ))}
          </select>
          {errors.shiftingType && (
            <span className="error">{errors.shiftingType}</span>
          )}
        </div>

        <div className="form-group">
          <label>Min Weight (kg)</label>
          <input
            type="number"
            name="minWeight"
            value={minWeight}
            onChange={(e) => setMinWeight(e.target.value)}
            placeholder="Enter Min Weight"
            className="form-control"
          />
          {errors.minWeight && (
            <span className="error">{errors.minWeight}</span>
          )}
        </div>

        <div className="form-group">
          <label>Max Weight (kg)</label>
          <input
            type="number"
            name="maxWeight"
            value={maxWeight}
            onChange={(e) => setMaxWeight(e.target.value)}
            placeholder="Enter Max Weight"
            className="form-control"
          />
          {errors.maxWeight && (
            <span className="error">{errors.maxWeight}</span>
          )}
        </div>

        <div className="form-group">
          <label>Price Per Km (₹)</label>
          <input
            type="number"
            name="pricePerKm"
            value={pricePerKm}
            onChange={(e) => setPricePerKm(e.target.value)}
            placeholder="Enter Price Per Km"
            className="form-control"
          />
          {errors.pricePerKm && (
            <span className="error">{errors.pricePerKm}</span>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Add Service
        </button>
      </form>
    </div>
  );
}

export default AddServicePage;
