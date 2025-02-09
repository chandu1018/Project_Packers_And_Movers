package com.packersandmovers.pojos;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "VENDOR_WEIGHT_PRICING")
@NoArgsConstructor
@Getter
@Setter
public class VendorWeightPricing extends BaseEntity {


    @ManyToOne
    @JoinColumn(name = "VendorID", nullable = false)
    private Vendor vendor;

    @ManyToOne
    @JoinColumn(name = "ShiftingID", nullable = false)
    private ShiftingType shiftingType;

    @Column(name = "MinWeight", nullable = false)
    private Double minWeight;

    @Column(name = "MaxWeight", nullable = false)
    private Double maxWeight;

    @Column(name = "PricePerKM", nullable = false)
    private Double pricePerKm;
}

