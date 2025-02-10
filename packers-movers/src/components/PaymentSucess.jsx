import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentDetails = location.state || {};

  return (
    <div style={styles.container}>
      <h1 style={styles.thankYou}>🎉 Payment Successful! 🎉</h1>
      <p>Your payment was processed successfully.</p>

      <div style={styles.detailsBox}>
        <h3>🔹 Payment Details</h3>
        <p>
          <strong>Order ID:</strong> {paymentDetails.razorpayOrderId || "N/A"}
        </p>
        <p>
          <strong>Payment ID:</strong> {paymentDetails.paymentId || "N/A"}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            style={{
              color: paymentDetails.status === "Paid" ? "green" : "red",
            }}
          >
            {paymentDetails.status}
          </span>
        </p>
        <p>
          <strong>Amount:</strong> ₹{paymentDetails.amount || "N/A"}
        </p>
        <p>
          <strong>Currency:</strong> {paymentDetails.currency || "INR"}
        </p>
      </div>

      <button style={styles.button} onClick={() => navigate("/")}>
        🏠 Go to Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    margin: "50px auto",
    padding: "20px",
    maxWidth: "500px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
  },
  thankYou: { color: "#2c3e50", fontSize: "24px" },
  detailsBox: {
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
    margin: "20px 0",
  },
  button: {
    backgroundColor: "#f57134",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default PaymentSuccess;
