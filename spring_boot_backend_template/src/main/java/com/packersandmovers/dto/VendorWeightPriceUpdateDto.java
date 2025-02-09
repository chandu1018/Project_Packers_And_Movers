package com.packersandmovers.dto;

import com.packersandmovers.pojos.ShiftingType;
import com.packersandmovers.pojos.Vendor;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor


public class VendorWeightPriceUpdateDto 
{
	//private Long id;

    private Double minWeight;

    private Double maxWeight;

    private Double pricePerKm;
    
    public VendorWeightPriceUpdateDto(Long id ,Double minWeight, Double maxWeight, Double pricePerKm) {
        //this.id = id;
    	this.minWeight = minWeight;
        this.maxWeight = maxWeight;
        this.pricePerKm = pricePerKm;
    }
}
