package com.packersandmovers.dto;

import com.packersandmovers.pojos.PaymentOrder;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class PaymentOrderDto 
{
	private Long id;
	private String razorpayOrderId;
    private String currency;
    private Double amount;
    private String status;
    private String paymentId;
    private Long userId;
    private Long vendorId;
    
    public PaymentOrderDto(PaymentOrder paymentOrder) {
        this.id = paymentOrder.getId();
        this.razorpayOrderId = paymentOrder.getRazorpayOrderId();
        this.currency = paymentOrder.getCurrency();
        this.amount = paymentOrder.getAmount();
        this.status = paymentOrder.getStatus();
        this.paymentId = paymentOrder.getPaymentId();
        this.userId = (paymentOrder.getUser() != null) ? paymentOrder.getUser().getId() : null;  
        this.vendorId = (paymentOrder.getVendor() != null )? paymentOrder.getVendor().getId() : null;  
    }
}
