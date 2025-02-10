package com.packersandmovers.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.packersandmovers.pojos.PaymentVerification;

public interface PaymentVerificationDao extends JpaRepository<PaymentVerification, Long>
{
	Optional<PaymentVerification> findByPaymentId(String paymentId);

}
