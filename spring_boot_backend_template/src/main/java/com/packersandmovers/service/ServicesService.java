package com.packersandmovers.service;

import java.util.List;

import com.packersandmovers.dto.ApiResponse;
import com.packersandmovers.dto.ServiceReqDTO;
import com.packersandmovers.dto.ServiceResDTO;

public interface ServicesService {

	ApiResponse addService(ServiceReqDTO serviceReqDTO);

	List<ServiceResDTO> getAllServices();

}
