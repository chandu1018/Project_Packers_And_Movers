package com.packersandmovers.service;

import com.packersandmovers.dto.PaymentOrderDto;
import com.razorpay.RazorpayException;

public interface PaymentService 
{
	PaymentOrderDto createOrder(Long userId,Long vendorId,Double Amount,String Currency) throws RazorpayException;
	PaymentOrderDto getOrderByRazorpayId(String razorpayOrderId);
	PaymentOrderDto updateOrderStatus(String razorpayOrderId,String paymentId,String status);

}
 