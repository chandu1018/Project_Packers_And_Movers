package com.packersandmovers.service;

import java.util.List;

import com.packersandmovers.dto.ApiResponse;
import com.packersandmovers.dto.VendorReqDTO;
import com.packersandmovers.dto.VendorsServiceDTO;
import com.packersandmovers.dto.VendorsServiceResDTO;
import com.packersandmovers.pojos.VendorServices;

public interface VendorServicesService 
{
	ApiResponse addVendorService(VendorsServiceDTO vendorServiceDto);
	
	List<VendorsServiceDTO> getAllServices();
	
	List<VendorsServiceResDTO> getAllServicesByVendorID(Long id);
	
	ApiResponse deleteVendorService(VendorsServiceResDTO dto);
	ApiResponse updatePrice(VendorsServiceResDTO dto);

}