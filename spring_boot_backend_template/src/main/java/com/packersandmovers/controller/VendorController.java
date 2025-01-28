package com.packersandmovers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.packersandmovers.dto.VendorReqDTO;
import com.packersandmovers.service.VendorService;


@RestController
@RequestMapping("/Vendor")
public class VendorController 
{
	@Autowired
	private VendorService vendorService;
	
	public VendorController()
	{
		System.out.println("Inside VendorController");
		
	}

	@PostMapping
	public ResponseEntity<?> signUp(@RequestBody VendorReqDTO vendorDto)
	{
		System.out.println("In Signup :"+vendorDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(vendorService.signIn(vendorDto));
	}
}
