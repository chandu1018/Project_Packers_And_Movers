package com.packersandmovers.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.packersandmovers.dto.ShiftingTypeDTO;
import com.packersandmovers.service.ShiftingTypeService;



@RestController
@RequestMapping("/Shifting")
@CrossOrigin(origins = "*")

public class ShiftingTypeController 
{
	@Autowired
	private ShiftingTypeService shiftingService;
	
	public ShiftingTypeController()
	{
		System.out.println("Inside the Shifting TypeController");
		
	}
	
	@PostMapping
	public ResponseEntity<?> addShiftingType(@RequestBody ShiftingTypeDTO shiftingDto)
	{
		System.out.println("In Signup :"+shiftingDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(shiftingService.addShiftingType(shiftingDto));
	}
	
	@GetMapping("/GetAll")
	public ResponseEntity<?> getAllShiftingTypes()
	{
		System.out.println("In Signup :");
		return ResponseEntity.status(HttpStatus.CREATED).body(shiftingService.getAllShiftingTypes());
	}
	@GetMapping("/Byname")
	public ResponseEntity<?> getShiftingTypeByName(@RequestParam String shiftingTypeName)
	{
		System.out.println("In Signup :");
		return ResponseEntity.status(HttpStatus.CREATED).body(shiftingService.getShiftingTypeByName(shiftingTypeName));
	}

}
