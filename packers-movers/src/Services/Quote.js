import axios from "axios";
import { createUrl } from "../utils";

export async function submitQuoteRequest(
  userId,
  vendorId,
  shiftingId,
  pickupLocation,
  dropoffLocation,
  preferredDate,
  additionalRequirements,
  shipmentWeight,
  requestStatus = "PENDING",
  paymentStatus = "PENDING",
  isDeleted = false
) {
  try {
    if (!pickupLocation || !dropoffLocation) {
      throw new Error("Pickup and Dropoff locations are required.");
    }

    const body = {
      userId,
      vendorId,
      shiftingId,
      pickupLocation,
      dropoffLocation,
      preferredDate,
      additionalRequirements,
      requestStatus,
      paymentStatus,
      isDeleted,
      shipmentWeight,
    };

    const url = createUrl("service-requests");

    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data && response.data.status === "success") {
      return response.data;
    } else {
      return {
        status: "error",
        error: response.data.message || "Unknown error",
      };
    }
  } catch (ex) {
    return {
      status: "error",
      error: ex.response ? ex.response.data.message : ex.message,
    };
  }
}
