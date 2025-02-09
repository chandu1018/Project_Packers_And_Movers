package com.packersandmovers.dto;

import java.math.BigDecimal;

import com.packersandmovers.pojos.ShiftingType;
import com.packersandmovers.pojos.Vendor;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class VendorWeightPricingDTO 
{

	private Long id;
	
	private Long shiftingType;
    

    private String shiftingTypeName;
    private Long vendor;
    
    
    private Double minWeight;

    private Double maxWeight;

    private Double  pricePerKm;
    
    
    
	
}
