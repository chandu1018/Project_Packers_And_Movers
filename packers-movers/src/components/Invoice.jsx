import React from "react";
import { useLocation } from "react-router-dom";
import PaymentComponent from "./PaymentComponent";
import "../styles/invoice.css";

const Invoice = () => {
  const { state } = useLocation();
  const userId = localStorage.getItem("userId");

  if (!state)
    return <p className="error-message">No invoice data available.</p>;

  const {
    vendorId,
    pickupLocation,
    dropoffLocation,
    preferredDate,
    requestStatus,
    paymentStatus,
    serviceName,
    shipmentWeight,
    vendorName,
    totalPrice,
  } = state;

  if (!userId || !vendorId) {
    return (
      <p className="error-message">Invalid data! User or Vendor ID missing.</p>
    );
  }

  const price = parseFloat(
    totalPrice?.replace("The total price of the service will be:", "").trim()
  );

  if (isNaN(price)) {
    return <p className="error-message">Invalid total price!</p>;
  }

  const downloadInvoice = () => {
    window.print();
  };

  return (
    <div className="invoice-container">
      <div className="invoice-box">
        <div className="invoice-header">
          <h1>Invoice</h1>
          <p>Thank you for choosing our service!</p>
        </div>

        <div className="invoice-details">
          <p>
            <span>Vendor:</span> {vendorName}
          </p>
          <p>
            <span>Pickup Location:</span> {pickupLocation}
          </p>
          <p>
            <span>Dropoff Location:</span> {dropoffLocation}
          </p>
          <p>
            <span>Preferred Date:</span>{" "}
            {new Date(preferredDate).toDateString()}
          </p>
          <p>
            <span>Shipment Weight:</span> {shipmentWeight} kg
          </p>
          <p>
            <span>Request Status:</span> {requestStatus}
          </p>
          <p>
            <span>Payment Status:</span> {paymentStatus}
          </p>
        </div>

        <div className="service-list">
          <h3>Services Included:</h3>
          <ul>
            {serviceName.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>

        <p className="total-amount">
          <span>Total Price:</span> ₹{price.toFixed(2)}
        </p>

        <div className="invoice-footer">
          <PaymentComponent
            userId={userId}
            vendorId={vendorId}
            totalPrice={price}
          />
          <button className="download-btn" onClick={downloadInvoice}>
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
