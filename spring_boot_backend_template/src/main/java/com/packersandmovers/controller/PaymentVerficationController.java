package com.packersandmovers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.packersandmovers.dto.PaymentVerificationDto;
import com.packersandmovers.service.PaymentVerifcationService;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")

public class PaymentVerficationController 
{
	
	@Autowired
	private PaymentVerifcationService paymentVerificationService;
	
	
	public PaymentVerficationController()
	{
		System.out.println("Inside the Payment Verfication Controller !");
	}
	
	@GetMapping("/verify")
	public ResponseEntity<PaymentVerificationDto> verifyPayment(@RequestParam String paymentId) throws RazorpayException
	{
		PaymentVerificationDto verifiedPayment = paymentVerificationService.verifyPayment(paymentId);
		
		return ResponseEntity.ok(verifiedPayment);
		
	}

}
