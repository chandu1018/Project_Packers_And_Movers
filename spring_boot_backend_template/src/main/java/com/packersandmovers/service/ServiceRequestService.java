package com.packersandmovers.service;

import java.util.List;

import com.packersandmovers.dto.ApiResponse;
import com.packersandmovers.dto.ServiceRequestDTO;
import com.packersandmovers.dto.ServiceRequestResDTO;
import com.packersandmovers.dto.ServiceRequestResUserDTO;
import com.packersandmovers.pojos.RequestStatus;

public interface ServiceRequestService {

	ApiResponse createServiceRequest(ServiceRequestDTO requestDTO);
	
	List<ServiceRequestResDTO> getServiceRequestByVendor(Long vid);
	
	String updateRequestStatus(Long id, RequestStatus status);
	
	String cancelRequest(Long id);
	
	List<ServiceRequestResUserDTO> getServiceRequestByUserId(Long userId);

}
