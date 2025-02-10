import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../Services/config";
import "../styles/table.css";

const VendorServiceRequests = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({}); // Track status changes per request
  const [vendorName, setVendorName] = useState("");
  const vendorId = localStorage.getItem("vendorId");

  useEffect(() => {
    const vendorName = sessionStorage.getItem("vendorName");
    console.log("Vendor", vendorName);
    if (vendorName) {
      setVendorName(vendorName);
    }

    axios
      .get(`${config.serverUrl}/service-requests/getByid/${vendorId}`)
      .then((res) => setServiceRequests(res.data))
      .catch(() => toast.error("Failed to load service requests."))
      .finally(() => setLoading(false));
  }, [vendorId]);

  const updateStatus = (id) => {
    const status = selectedStatus[id]; // Get the status for this specific request
    if (!status) return; // If no status selected, don't update

    setUpdating(id);
    axios
      .put(
        `${config.serverUrl}/service-requests/edit/${id}/status?status=${status}`
      )
      .then(() => {
        setServiceRequests((prev) =>
          prev.map((req) =>
            req.serviceRequestId === id
              ? { ...req, requestStatus: status }
              : req
          )
        );
        toast.success("Status updated!");
      })
      .catch(() => toast.error("Failed to update status."))
      .finally(() => setUpdating(null));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="table-container">
      <h2>{vendorName} - Service Requests</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Shifting Type</th>
            <th>Shipment Weight</th>
            <th>Pickup Location</th>
            <th>Dropoff Location</th>
            <th>Preferred Date</th>
            <th>Request Status</th>
            <th>Payment Status</th>
            <th>Services</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {serviceRequests.map((req) => (
            <tr key={req.serviceRequestId}>
              <td>{req.userName}</td>
              <td>{req.email}</td>
              <td>{req.shifting}</td>
              <td>{req.shipmentWeight} kg</td>
              <td>{req.pickupLocation}</td>
              <td>{req.dropoffLocation}</td>
              <td>{req.preferredDate}</td>
              <td>
                {req.requestStatus === "CANCELLED" ? (
                  <span className="canceled">CANCELLED</span>
                ) : (
                  <select
                    value={
                      selectedStatus[req.serviceRequestId] || req.requestStatus
                    }
                    onChange={(e) =>
                      setSelectedStatus({
                        ...selectedStatus,
                        [req.serviceRequestId]: e.target.value,
                      })
                    }
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                )}
              </td>
              <td
                className={req.paymentStatus === "PENDING" ? "pending" : "paid"}
              >
                {req.paymentStatus}
              </td>
              <td>{req.serviceNames?.join(", ") || "N/A"}</td>
              <td>
                {req.requestStatus !== "CANCELLED" && (
                  <button
                    className="update-btn"
                    onClick={() => updateStatus(req.serviceRequestId)}
                    disabled={updating === req.serviceRequestId}
                  >
                    {updating === req.serviceRequestId
                      ? "Updating..."
                      : "Update"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorServiceRequests;
