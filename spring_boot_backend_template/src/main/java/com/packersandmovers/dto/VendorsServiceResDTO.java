package com.packersandmovers.dto;


import com.packersandmovers.pojos.Services;
import com.packersandmovers.pojos.Vendor;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class VendorsServiceResDTO 
{
	
	private Long vendorid;
	
	
	private String servicesName;


	private Long price;

}