import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { config } from "../Services/config";

const VerifyPayment = () => {
  const [paymentId, setPaymentId] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      setError(null);
      const response = await axios.get(`${config.serverUrl}/verify`, {
        params: { paymentId },
      });

      if (response.data) {
        setPaymentDetails(response.data);
        navigate("/payment-success", { state: response.data }); // Navigate to success page with payment details
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setError("Failed to verify payment. Please check the Payment ID.");
    }
  };

  return (
    <div>
      <h2>Verify Payment</h2>
      <input
        type="text"
        placeholder="Enter Payment ID"
        value={paymentId}
        onChange={(e) => setPaymentId(e.target.value)}
      />
      <button onClick={verifyPayment}>Verify</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {paymentDetails && (
        <div>
          <h3>Payment Details:</h3>
          <p>
            <strong>Order ID:</strong> {paymentDetails.razorpayOrderId}
          </p>
          <p>
            <strong>Payment ID:</strong> {paymentDetails.paymentId}
          </p>
          <p>
            <strong>Status:</strong> {paymentDetails.status}
          </p>
          <p>
            <strong>Amount:</strong> ₹{paymentDetails.amount}
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifyPayment;
