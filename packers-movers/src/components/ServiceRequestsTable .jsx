import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../Services/config";
import { toast } from "react-toastify";
import "../styles/table.css";

const ServiceRequestsPage = () => {
  const navigate = useNavigate();
  const [serviceRequests, setServiceRequests] = useState([]);
  const [updating, setUpdating] = useState(null);
  const [userName, setUserName] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const user = sessionStorage.getItem("userName");
    console.log("user", user);
    if (user) {
      setUserName(user);
    }

    if (!userId) {
      toast.error("User not logged in.");
      navigate("/login");
      return;
    }
    axios
      .get(`${config.serverUrl}/service-requests/getByuser/${userId}`)
      .then((res) => setServiceRequests(res.data))
      .catch(() => toast.error("Failed to load service requests."));
  }, [userId, navigate]);

  const handleCancel = async (serviceRequestId) => {
    setUpdating(serviceRequestId);
    try {
      await axios.put(
        `${config.serverUrl}/service-requests/cancel/${serviceRequestId}/status`
      );
      setServiceRequests((prev) =>
        prev.map((req) =>
          req.serviceRequestId === serviceRequestId
            ? { ...req, requestStatus: "CANCELED" }
            : req
        )
      );
      toast.success("Service request canceled!");
    } catch {
      toast.error("Failed to cancel service request.");
    }
    setUpdating(null);
  };

  return (
    <div className="service-requests-page">
      <h2> {userName} - Service Requests</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Shifting Type</th>
            <th>Shipment Weight (kg)</th>
            <th>Pickup Location</th>
            <th>Dropoff Location</th>
            <th>Preferred Date</th>
            <th>Request Status</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {serviceRequests.length ? (
            serviceRequests.map(
              ({
                serviceRequestId,
                shifting,
                shipmentWeight,
                pickupLocation,
                dropoffLocation,
                preferredDate,
                requestStatus,
                paymentStatus,
              }) => (
                <tr key={serviceRequestId}>
                  <td>{shifting}</td>
                  <td>{shipmentWeight}</td>
                  <td>{pickupLocation}</td>
                  <td>{dropoffLocation}</td>
                  <td>{preferredDate}</td>
                  <td
                    className={requestStatus === "CANCELED" ? "canceled" : ""}
                  >
                    {requestStatus}
                  </td>
                  <td>{paymentStatus}</td>
                  <td>
                    {requestStatus === "PENDING" && (
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancel(serviceRequestId)}
                        disabled={updating === serviceRequestId}
                      >
                        {updating === serviceRequestId
                          ? "Canceling..."
                          : "Cancel"}
                      </button>
                    )}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="8">No service requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <button className="back-btn" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button> */}
    </div>
  );
};

export default ServiceRequestsPage;
