package com.packersandmovers.service;

import com.packersandmovers.dto.ApiResponse;
import com.packersandmovers.dto.VendorReqDTO;

public interface VendorService 
{
	ApiResponse signIn(VendorReqDTO dto);
	

}
