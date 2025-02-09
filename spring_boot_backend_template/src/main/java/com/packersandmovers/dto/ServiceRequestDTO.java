package com.packersandmovers.dto;

import lombok.*;
import java.util.Date;
import java.util.List;

import com.packersandmovers.pojos.PaymentStatus;
import com.packersandmovers.pojos.RequestStatus;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ServiceRequestDTO {
    private Long userId;                           
    private Long vendorId;                         
    private Long shiftingId;                       
    private String pickupLocation;                 
    private String dropoffLocation;                
    private Date preferredDate;                    
    private List<Long> requirementIds;   // Updated field name
    private RequestStatus requestStatus;           
    private PaymentStatus paymentStatus;           
    private Boolean isDeleted;                     
    private double shipmentWeight;                 
}
