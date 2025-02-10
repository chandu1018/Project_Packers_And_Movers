import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../Services/config";
import { useNavigate } from "react-router-dom";

const GetQuote = () => {
  const navigate = useNavigate();
  const districtsOfMaharashtra = [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Thane",
    "Nashik",
    "Aurangabad",
    "Solapur",
    "Amravati",
    "Kolhapur",
    "Jalgaon",
    "Akola",
    "Latur",
    "Dhule",
    "Chandrapur",
    "Parbhani",
    "Beed",
    "Nanded",
    "Satara",
    "Ahmednagar",
    "Yavatmal",
    "Karad",
  ];

  const [formData, setFormData] = useState({
    userId: "1",
    shiftingId: "",
    pickupLocation: "",
    dropoffLocation: "",
    preferredDate: "",
    shipmentWeight: "",
  });

  const [errors, setErrors] = useState({});
  const [shiftingTypes, setShiftingTypes] = useState([]);

  useEffect(() => {
    const fetchShiftingTypes = async () => {
      try {
        const response = await axios.get(`${config.serverUrl}/Shifting/GetAll`);
        setShiftingTypes(response.data);
      } catch (error) {
        console.error("Error fetching shifting types:", error);
      }
    };
    fetchShiftingTypes();
  }, []);

  const validateForm = () => {
    const formErrors = {};
    if (!formData.pickupLocation)
      formErrors.pickupLocation = "Pickup location is required";
    if (!formData.dropoffLocation)
      formErrors.dropoffLocation = "Dropoff location is required";
    if (formData.pickupLocation === formData.dropoffLocation)
      formErrors.dropoffLocation =
        "Pickup and Dropoff locations cannot be the same";
    if (!formData.preferredDate)
      formErrors.preferredDate = "Preferred date is required";
    if (!formData.shipmentWeight)
      formErrors.shipmentWeight = "Shipment weight is required";
    if (!formData.shiftingId)
      formErrors.shiftingId = "Shifting type is required";
    return formErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      navigate("/vendor-comparison", { state: { formData } });
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="form-container">
      <h2>Get a Quote</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Pickup Location</label>
          <select
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
          >
            <option value="">Select Pickup Location</option>
            {districtsOfMaharashtra.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.pickupLocation && (
            <span className="error">{errors.pickupLocation}</span>
          )}
        </div>

        <div className="form-group">
          <label>Dropoff Location</label>
          <select
            name="dropoffLocation"
            value={formData.dropoffLocation}
            onChange={handleChange}
          >
            <option value="">Select Dropoff Location</option>
            {districtsOfMaharashtra.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.dropoffLocation && (
            <span className="error">{errors.dropoffLocation}</span>
          )}
        </div>

        <div className="form-group">
          <label>Preferred Date</label>
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
          />
          {errors.preferredDate && (
            <span className="error">{errors.preferredDate}</span>
          )}
        </div>

        <div className="form-group">
          <label>Shipment Weight (kg)</label>
          <input
            type="number"
            name="shipmentWeight"
            value={formData.shipmentWeight}
            onChange={handleChange}
          />
          {errors.shipmentWeight && (
            <span className="error">{errors.shipmentWeight}</span>
          )}
        </div>

        <div className="form-group">
          <label>Shifting Type</label>
          <select
            name="shiftingId"
            value={formData.shiftingId}
            onChange={handleChange}
          >
            <option value="">Select Shifting Type</option>
            {shiftingTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.shiftingTypeName}
              </option>
            ))}
          </select>
          {errors.shiftingId && (
            <span className="error">{errors.shiftingId}</span>
          )}
        </div>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default GetQuote;
