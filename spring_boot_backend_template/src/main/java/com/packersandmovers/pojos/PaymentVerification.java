package com.packersandmovers.pojos;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="payment_verification_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class PaymentVerification extends BaseEntity 
{
	private String razorpayOrderId; 
    private String paymentId;  
    private String currency;
    private Double amount;
    private String status;  
    
    @ManyToOne(fetch = FetchType.EAGER)  
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)  
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;

	

}
