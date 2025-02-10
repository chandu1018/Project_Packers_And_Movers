package com.packersandmovers.service;

import java.util.List;

import com.packersandmovers.dto.ApiResponse;
import com.packersandmovers.dto.AuthRequest;
import com.packersandmovers.dto.VendorReqDTO;
import com.packersandmovers.dto.VendorResDTO;

public interface VendorService 
{
	ApiResponse signIn(VendorReqDTO dto);
	
	List<VendorResDTO> getAllVendors();
	
	VendorResDTO signIn(AuthRequest dto);

}
