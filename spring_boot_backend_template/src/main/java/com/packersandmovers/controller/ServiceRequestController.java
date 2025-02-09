package com.packersandmovers.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.packersandmovers.dto.ApiResponse;
import com.packersandmovers.dto.ServiceRequestDTO;
import com.packersandmovers.dto.ServiceRequestResDTO;
import com.packersandmovers.dto.ServiceRequestResUserDTO;
import com.packersandmovers.pojos.RequestStatus;
import com.packersandmovers.service.ServiceRequestService;

@RestController
@RequestMapping("/service-requests")
@CrossOrigin(origins = "*")

public class ServiceRequestController 
{
    @Autowired
    ServiceRequestService serviceRequestService;
	
	@PostMapping
    public ResponseEntity<ApiResponse> createServiceRequest(@RequestBody ServiceRequestDTO requestDTO) {
        ApiResponse createdRequest = serviceRequestService.createServiceRequest(requestDTO);
        return ResponseEntity.ok(createdRequest);
    }
	
	@GetMapping("getByid/{vid}")
    public ResponseEntity<List<ServiceRequestResDTO>> getServiceRequestByVendor(@PathVariable Long vid  ) {
        return ResponseEntity.ok( serviceRequestService.getServiceRequestByVendor(vid));
    }
	
	@PutMapping("edit/{id}/status")
	 public  ResponseEntity<String> updateRequestStatus(@PathVariable Long id,@RequestParam RequestStatus status)
	 {
	      serviceRequestService.updateRequestStatus(id, status);
	       return ResponseEntity.ok("Request status updated successfully to " + status);
	 }
	
	@PutMapping("cancel/{id}/status")
	 public  ResponseEntity<String> cancelRequest(@PathVariable Long id)
	 {
	      serviceRequestService.cancelRequest(id);
	       return ResponseEntity.ok("Request status cancelled successfully"  );
	 }
	
	@GetMapping("getByuser/{uid}")
    public ResponseEntity<List<ServiceRequestResUserDTO>> getServiceRequestByUser(@PathVariable Long uid  ) {
        return ResponseEntity.ok( serviceRequestService.getServiceRequestByUserId(uid));
    }
}
