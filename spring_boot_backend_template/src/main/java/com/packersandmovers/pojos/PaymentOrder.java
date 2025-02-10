package com.packersandmovers.pojos;

import org.hibernate.annotations.ManyToAny;

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
@Table(name="payment_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class PaymentOrder extends BaseEntity 
{
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="user_id")
	private User user;
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="vendor_id")
	private Vendor vendor;
	
	private String razorpayOrderId;
	
	private String currency;
	
	private Double amount;
	
	private String status;
	
	private String paymentId;
	
	
	
}
