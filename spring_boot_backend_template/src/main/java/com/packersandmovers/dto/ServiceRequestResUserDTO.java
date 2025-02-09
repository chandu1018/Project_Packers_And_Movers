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
public class ServiceRequestResUserDTO {
	private Long serviceRequestId;
    private String userName;     
    private String email; 
    private String vendorName;                         
    private String shifting;   
    private double shipmentWeight; 
    private String pickupLocation;                 
    private String dropoffLocation;                
    private Date preferredDate;                    
    private RequestStatus requestStatus;           
    private PaymentStatus paymentStatus;           
    private Boolean isDeleted;                     
    private List<String> serviceNames;             
}