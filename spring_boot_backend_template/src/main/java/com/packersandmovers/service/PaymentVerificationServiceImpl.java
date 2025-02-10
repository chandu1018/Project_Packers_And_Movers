package com.packersandmovers.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.packersandmovers.dao.PaymentVerificationDao;
import com.packersandmovers.dao.PaymentOrderDao;  // ✅ Added PaymentOrderDao
import com.packersandmovers.dao.UserDao;
import com.packersandmovers.dao.VendorDao;
import com.packersandmovers.dto.PaymentVerificationDto;
import com.packersandmovers.pojos.PaymentOrder;  // ✅ Added PaymentOrder Entity
import com.packersandmovers.pojos.PaymentVerification;
import com.packersandmovers.pojos.User;
import com.packersandmovers.pojos.Vendor;
import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Service
@Transactional
public class PaymentVerificationServiceImpl implements PaymentVerifcationService {

    @Autowired
    private PaymentVerificationDao paymentVerifyingDao;
    
    @Autowired
    private PaymentOrderDao paymentOrderDao;  // ✅ Added PaymentOrderDao

    @Autowired
    private UserDao userDao;
    
    @Autowired
    private VendorDao vendorDao;
    
    @Value("${razorpay.key_id}")
    private String razorPayKeyId;

    @Value("${razorpay.key_secret}")
    private String razorPaySecretId;

	@Override
	public PaymentVerificationDto verifyPayment(String paymentId) throws RazorpayException {
		 RazorpayClient razorpay = new RazorpayClient(razorPayKeyId, razorPaySecretId);

	        
	        Payment payment = razorpay.payments.fetch(paymentId);
	        String razorpayOrderId = payment.get("order_id");
	        String status = payment.get("status");
	        Double amount = ((Number) payment.get("amount")).doubleValue() / 100.0;  // ✅ Convert Integer to Double

	        System.out.println("Verifying Payment: " + paymentId + " | Status: " + status);

	      
	        Optional<PaymentVerification> existingPayment = paymentVerifyingDao.findByPaymentId(paymentId);
	        if (existingPayment.isPresent()) {
	            System.out.println("Payment Already Verified: " + paymentId);
	            return new PaymentVerificationDto(existingPayment.get());
	        }

	      
	        PaymentOrder paymentOrder = paymentOrderDao.findByRazorpayOrderId(razorpayOrderId)
	                .orElseThrow(() -> new RuntimeException("Order Not Found for Razorpay Order ID: " + razorpayOrderId));

	        User user = paymentOrder.getUser(); 
	        Vendor vendor = paymentOrder.getVendor();  

	       
	        PaymentVerification paymentVerification = new PaymentVerification();
	        paymentVerification.setUser(user);
	        paymentVerification.setVendor(vendor);
	        paymentVerification.setRazorpayOrderId(razorpayOrderId);
	        paymentVerification.setPaymentId(paymentId);
	        paymentVerification.setCurrency("INR");
	        paymentVerification.setAmount(amount);
	        paymentVerification.setStatus(status);

	        paymentVerification = paymentVerifyingDao.save(paymentVerification);

	        return new PaymentVerificationDto(paymentVerification);
	}

   
}