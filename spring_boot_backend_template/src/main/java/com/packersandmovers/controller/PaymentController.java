package com.packersandmovers.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.packersandmovers.dto.PaymentOrderDto;
import com.packersandmovers.service.PaymentService;
import com.razorpay.RazorpayException;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "*")

public class PaymentController 
{
	@Autowired
	private PaymentService paymentService;
	
	public PaymentController()
	{
		System.out.println("Inside Payment Controller");
		
	}
	
	@PostMapping("/create-order")
	public ResponseEntity<PaymentOrderDto> createOrder(@RequestParam Long userId,@RequestParam Long vendorId, @RequestParam Double amount) throws RazorpayException
	{
		PaymentOrderDto order = paymentService.createOrder(userId, vendorId, amount, "INR");
		
		return ResponseEntity.ok(order);
		
		
	}
	
	@PostMapping("/webhook")
	public ResponseEntity<String> handlePaymentWebhook(@RequestBody Map<String,Object> payload)
	{
		String razorpayOrderId = (String) ((Map<String,Object>)payload.get("payload")).get("order_id");
		String paymentId = (String) ((Map<String,Object>) payload.get("payload")).get("payment_id");
		String status = payload.get("event").equals("payment.captured")? "Paid":"Failed";
		
		paymentService.updateOrderStatus(razorpayOrderId, paymentId, status);
		return ResponseEntity.ok("Payment Status Updated ");
	}
	
	@GetMapping("/order/{razorpayOrderId}")
	public ResponseEntity<PaymentOrderDto> getOrderByRazorpayId(@PathVariable String razorpayOrderId) {
	    return ResponseEntity.ok(paymentService.getOrderByRazorpayId(razorpayOrderId));
	}

}
