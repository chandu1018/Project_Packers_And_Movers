package com.packersandmovers.service;

import com.packersandmovers.dto.PaymentVerificationDto;
import com.razorpay.RazorpayException;

public interface PaymentVerifcationService 
{
	PaymentVerificationDto verifyPayment (String paymentId) throws RazorpayException;

}
