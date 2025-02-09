package com.packersandmovers.pojos;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class CityDistance {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long distanceId;
    
    private String fromCity;
    
    private String toCity;
    
    private Long distanceKm;

 
}

