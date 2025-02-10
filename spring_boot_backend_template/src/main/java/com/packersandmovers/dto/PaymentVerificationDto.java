package com.packersandmovers.dto;

import com.packersandmovers.pojos.PaymentVerification;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class PaymentVerificationDto 
{
	 	private Long id;
	 	private String razorpayOrderId;
	    private String paymentId;
	    private String currency;
	    private Double amount;
	    private String status;
	    private Long userId;
	    private Long vendorId;
	    
	    
	    public PaymentVerificationDto(PaymentVerification paymentVerification) {
	        this.id = paymentVerification.getId();
	        this.razorpayOrderId = paymentVerification.getRazorpayOrderId();
	        this.paymentId = paymentVerification.getPaymentId();
	        this.currency = paymentVerification.getCurrency();
	        this.amount = paymentVerification.getAmount();
	        this.status = paymentVerification.getStatus();
	        this.userId = (paymentVerification.getUser() != null) ? paymentVerification.getUser().getId() : null;
	        this.vendorId = (paymentVerification.getVendor() != null) ? paymentVerification.getVendor().getId() : null;
	    }
}
