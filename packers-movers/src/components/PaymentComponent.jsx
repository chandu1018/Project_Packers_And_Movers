import React, { useState } from "react";
import axios from "axios";
import { config } from "../Services/config";
import { useNavigate } from "react-router-dom";

const PaymentComponent = ({ userId, vendorId, totalPrice }) => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    const localUserId = localStorage.getItem("userId");

    if (!localUserId || !vendorId || !totalPrice) {
      console.error("Invalid input: Missing userId, vendorId, or totalPrice");
      setLoading(false);
      setPaymentStatus("Payment Failed: Missing required data");
      return;
    }

    try {
      // Create Order API
      const response = await axios.post(
        `${config.serverUrl}/payments/create-order`,
        null,
        {
          params: {
            userId: localUserId,
            vendorId: vendorId,
            amount: totalPrice,
          },
        }
      );

      const { razorpayOrderId, amount, currency } = response.data;

      // Razorpay Options
      const options = {
        key: "rzp_test_388JpWc9Xuqwan",
        amount: amount * 100,
        currency: currency,
        name: "Packers & Movers",
        description: "Payment for shifting service",
        order_id: razorpayOrderId,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          const paymentData = {
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            signature: razorpay_signature,
          };

          try {
            const verifyResponse = await axios.get(
              `${config.serverUrl}/verify`,
              {
                params: { paymentId: razorpay_payment_id },
              }
            );

            const verifiedPaymentDetails = verifyResponse.data;

            navigate("/payment-success", { state: verifiedPaymentDetails });

            setPaymentStatus("Payment Successful");
          } catch (verifyError) {
            console.error("Error in payment verification:", verifyError);
            setErrorDetails(verifyError.response?.data || "Unknown error");
            setPaymentStatus("Payment Verification Failed");
          }
        },
        prefill: {
          name: "Packers & Movers",
          email: "packersandmovers@sunbeaminfo.com",
          contact: "+911234567890",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error in payment:", error);
      setErrorDetails(error.response?.data || "Unknown error");
      setPaymentStatus("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Payment Details</h2>
      <button
        className="pay-now-btn"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {paymentStatus && <p>Status: {paymentStatus}</p>}
      {errorDetails && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <h4>Error Details:</h4>
          <pre>{JSON.stringify(errorDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PaymentComponent;
