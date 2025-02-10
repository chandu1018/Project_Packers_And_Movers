import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { config } from "../Services/config";
import { useNavigate } from "react-router-dom";
import "../styles/vendorCompare.css";

const SelectServices = () => {
  const { state } = useLocation();
  const { selectedVendor, formData } = state || {};

  const [services, setServices] = useState([]);
  const [vendorServices, setVendorServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendorServices = async () => {
      try {
        const [allServicesRes, vendorServicesRes] = await Promise.all([
          axios.get(`${config.serverUrl}/service/Get`),
          axios.get(`${config.serverUrl}/VendorServices/getAll`),
        ]);

        setServices(allServicesRes.data);
        setVendorServices(
          vendorServicesRes.data.filter(
            (vs) => vs.vendorid === selectedVendor.id
          )
        );

        console.log("Vendor Data:", selectedVendor);
        console.log("Vendor Services:", vendorServicesRes.data);
        console.log("All Services:", allServicesRes.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    if (selectedVendor) {
      fetchVendorServices();
    }
  }, [selectedVendor]);

  const handleServiceSelect = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleConfirmSelection = async () => {
    const selectedServiceDetails = services.filter((service) =>
      selectedServices.includes(service.id)
    );

    const preferredDate = new Date(formData.preferredDate);
    const isValidDate = !isNaN(preferredDate.getTime());

    const finalPayload = {
      userId: localStorage.getItem("userId"),
      vendorId: selectedVendor.id,
      vendorName: selectedVendor.bussinessName,
      shiftingId: formData.shiftingId,
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
      preferredDate: isValidDate
        ? preferredDate.toISOString()
        : new Date().toISOString(),
      requirementIds: selectedServiceDetails.map((s) => s.id),
      serviceName: selectedServiceDetails.map((s) => s.serviceName),
      requestStatus: "PENDING",
      paymentStatus: "PENDING",
      isDeleted: false,
      shipmentWeight: formData.shipmentWeight,
    };

    try {
      const response = await axios.post(
        `${config.serverUrl}/service-requests`,
        finalPayload
      );

      if (response.data) {
        navigate("/invoice", {
          state: { ...finalPayload, totalPrice: response.data.message },
        });
      }
    } catch (error) {
      console.error("Error submitting service request:", error);
    }
  };

  return (
    <div className="container">
      <h1>Service Selection</h1>
      {selectedVendor ? (
        <div>
          <h2>{selectedVendor.bussinessName}</h2>

          <div className="table">
            <div className="services-column">
              <h3>Services</h3>
              {services.map((service) => {
                const vendorService = vendorServices.find(
                  (vs) => vs.servicesid === service.id
                );

                return (
                  vendorService && (
                    <div key={service.id} className="service-item">
                      <label style={{ marginLeft: "8px" }}>
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(service.id)}
                          onChange={() => handleServiceSelect(service.id)}
                        />
                        {service.serviceName} - ₹{vendorService.price}
                      </label>
                    </div>
                  )
                );
              })}
            </div>
          </div>

          <button className="confirm-btn" onClick={handleConfirmSelection}>
            Confirm Selection
          </button>
        </div>
      ) : (
        <p>Loading vendor details...</p>
      )}
    </div>
  );
};

export default SelectServices;
