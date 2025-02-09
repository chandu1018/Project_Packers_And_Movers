package com.packersandmovers.service;


import com.packersandmovers.dao.ShiftingTypeDao;
import com.packersandmovers.dao.VendorDao;
import com.packersandmovers.dao.VendorWeightPricingDao;
import com.packersandmovers.dto.ApiResponse;
import com.packersandmovers.dto.VendorWeightPriceUpdateDto;
import com.packersandmovers.dto.VendorWeightPricingDTO;
import com.packersandmovers.pojos.ShiftingType;
import com.packersandmovers.pojos.Vendor;
import com.packersandmovers.pojos.VendorWeightPricing;

import jakarta.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class VendorWeightPricingServiceImpl implements VendorWeightPricingService
{

    @Autowired
    private VendorWeightPricingDao vendorWeightPricingDao;
    
    @Autowired
    private VendorDao venderDao;
    
    @Autowired
    private ShiftingTypeDao shiftingTypeDao;
    

    
    @Autowired
    private ModelMapper modelMapper;
    
    
    	
    	@Override
    	public ApiResponse savePricing(VendorWeightPricingDTO pricing)
    	{
    	    Vendor vendor = venderDao.findById(pricing.getVendor())
    	        .orElseThrow(() -> new RuntimeException("Vendor not found with ID: " + pricing.getVendor()));
    	    
    	    ShiftingType shiftingType = shiftingTypeDao.findById(pricing.getShiftingType())
    	        .orElseThrow(() -> new RuntimeException("ShiftingType not found with ID: " + pricing.getShiftingType()));
    	    
    	    VendorWeightPricing vendorWeightPricing = new VendorWeightPricing();
    	    
    	    vendorWeightPricing.setVendor(vendor);
    	    vendorWeightPricing.setShiftingType(shiftingType);
    	    vendorWeightPricing.setMinWeight(pricing.getMinWeight());
    	    vendorWeightPricing.setMaxWeight(pricing.getMaxWeight());
    	    vendorWeightPricing.setPricePerKm(pricing.getPricePerKm());
    	    
    	    vendorWeightPricing.setCreatedOn(LocalDate.now());
    	    vendorWeightPricing.setUpdatedOn(LocalDateTime.now());
    	    
    	    vendorWeightPricingDao.save(vendorWeightPricing);

    	    return new ApiResponse("Added new VendorWeightPricing for Vendor ");
    	}

	

    

    public List<VendorWeightPricing> getAllPricing() {
        return vendorWeightPricingDao.findAll();
    }

    public Optional<VendorWeightPricing> getPricingById(Long id) {
        return vendorWeightPricingDao.findById(id);
    }

       

    public void deletePricing(Long id) {
    	vendorWeightPricingDao.deleteById(id);
		
    }


	@Override
	public List<VendorWeightPricingDTO> getVendorPrice(Long vendorId) 
	{
		return vendorWeightPricingDao.findByVendorId(vendorId);
	}





	@Override
	public VendorWeightPriceUpdateDto updateVendorWeightandPrice(Long vendorWeightPriceId,VendorWeightPriceUpdateDto vendorWeightPrice) 
	{
		
		VendorWeightPricing vendorEnity = vendorWeightPricingDao.findById(vendorWeightPriceId).orElseThrow(()->new RuntimeException("Pricing not found for ID :"+vendorWeightPriceId));
		
		 vendorEnity.setPricePerKm(vendorWeightPrice.getPricePerKm());
		 vendorEnity.setMaxWeight(vendorWeightPrice.getMaxWeight());
		 vendorEnity.setMinWeight(vendorWeightPrice.getMinWeight());
		 
		 vendorEnity = vendorWeightPricingDao.save(vendorEnity);
		 
		 return new VendorWeightPriceUpdateDto(
				 vendorEnity.getId(),
				 vendorEnity.getMinWeight(),
				 vendorEnity.getMaxWeight(),
				 vendorEnity.getPricePerKm()
			    );
	}


}





	

	

			
	

  