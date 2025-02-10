package com.packersandmovers.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.packersandmovers.pojos.Requirement;
import com.packersandmovers.pojos.VendorWeightPricing;

public interface  RequirementDao extends JpaRepository<Requirement, Long> {

	List<Requirement> findAllByServiceRequestId(Long serviceRequestId);
}