package com.packersandmovers.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.packersandmovers.dto.ServiceReqDTO;
import com.packersandmovers.dto.ServiceResDTO;
import com.packersandmovers.dto.VendorReqDTO;
import com.packersandmovers.service.ServicesService;
import com.packersandmovers.service.VendorService;


@RestController
@RequestMapping("/service")
@CrossOrigin(origins = "*")

public class ServicesController 
{
	 
     @Autowired
     ServicesService servicesService;

	@PostMapping("/Add")
	public ResponseEntity<?> addService(@RequestBody ServiceReqDTO serviceReqDTO )
	{
		System.out.println("In Signup :"+serviceReqDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(servicesService.addService(serviceReqDTO));
	}
	
	@GetMapping("/Get")
	public List<ServiceResDTO> getAllServices() {
		   return servicesService.getAllServices();
	}
}
