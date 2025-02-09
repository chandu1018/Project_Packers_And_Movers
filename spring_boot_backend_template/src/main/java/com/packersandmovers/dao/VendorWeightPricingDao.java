package com.packersandmovers.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.packersandmovers.dto.VendorWeightPriceUpdateDto;
import com.packersandmovers.dto.VendorWeightPricingDTO;
import com.packersandmovers.pojos.VendorWeightPricing;

import java.util.List;
import java.util.Optional;

public interface VendorWeightPricingDao extends JpaRepository<VendorWeightPricing, Long> {

	@Query("SELECT vwp FROM VendorWeightPricing vwp WHERE vwp.vendor.id = :vendorId AND :weight BETWEEN vwp.minWeight AND vwp.maxWeight")
	Optional<VendorWeightPricing> findCostByVendorAndWeight(@Param("vendorId") Long vendorId,
			@Param("weight") Double weight);

	@Query("SELECT new com.packersandmovers.dto.VendorWeightPricingDTO(vp.id,vp.shiftingType.id, vp.shiftingType.shiftingTypeName, vp.vendor.id, vp.minWeight, vp.maxWeight, vp.pricePerKm) FROM VendorWeightPricing vp WHERE vp.vendor.id = :vendorId")
	List<VendorWeightPricingDTO> findByVendorId(@Param("vendorId") Long vendorId);

	@Query("SELECT vp FROM VendorWeightPricing vp WHERE vp.id = :vendorWeightPricingId")
	Optional<VendorWeightPricing> findById(@Param("vendorWeightPricingId") Long vendorWeightPricingId);
}
