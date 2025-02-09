package com.packersandmovers.service;

import java.util.List;
import java.util.Optional;

import com.packersandmovers.dto.ApiResponse;
import com.packersandmovers.dto.VendorWeightPriceUpdateDto;
import com.packersandmovers.dto.VendorWeightPricingDTO;
import com.packersandmovers.pojos.VendorWeightPricing;

public interface VendorWeightPricingService {

	ApiResponse savePricing(VendorWeightPricingDTO pricing);

	List<VendorWeightPricing> getAllPricing();

	Optional<VendorWeightPricing> getPricingById(Long id);

	void deletePricing(Long id);

	List<VendorWeightPricingDTO> getVendorPrice(Long vendorId);

	VendorWeightPriceUpdateDto updateVendorWeightandPrice(Long vendorPriceWeightId,
			VendorWeightPriceUpdateDto vendorWeightPrice);

}
