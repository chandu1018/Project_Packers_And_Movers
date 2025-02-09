package com.packersandmovers.service;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.packersandmovers.dao.*;
import com.packersandmovers.dto.ApiResponse;
import com.packersandmovers.dto.ServiceRequestDTO;
import com.packersandmovers.dto.ServiceRequestResDTO;
import com.packersandmovers.dto.ServiceRequestResUserDTO;
import com.packersandmovers.pojos.*;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ServiceRequestServiceImpl implements ServiceRequestService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private VendorDao vendorDao;

    @Autowired
    private ShiftingTypeDao shiftingTypeDao;

    @Autowired
    private CityDistanceService cityDistanceService;

    @Autowired
    private VendorWeightPricingDao vendorWeightPricingDao;

    @Autowired
    private ServiceRequestDao serviceRequestDao;

    @Autowired
    private ServicesDao servicesDao;

    @Autowired
    private VendorServiceDao vendorServiceDao;

    @Autowired
    private RequirementDao requirementDao; // New DAO for Requirement

    @Override
    public ApiResponse createServiceRequest(ServiceRequestDTO requestDTO) {
        User user = userDao.findById(requestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + requestDTO.getUserId()));

        Vendor vendor = vendorDao.findById(requestDTO.getVendorId())
                .orElseThrow(() -> new RuntimeException("Vendor not found with ID: " + requestDTO.getVendorId()));

        ShiftingType shiftingType = shiftingTypeDao.findById(requestDTO.getShiftingId())
                .orElseThrow(() -> new RuntimeException("Shifting type not found with ID: " + requestDTO.getShiftingId()));

        // Get Distance
        Long distance = cityDistanceService.getDistance(requestDTO.getPickupLocation(), requestDTO.getDropoffLocation());
        if (distance == null) {
            throw new RuntimeException("Distance not found for the given locations: " +
                    requestDTO.getPickupLocation() + " to " + requestDTO.getDropoffLocation());
        }

        System.out.println("Distance: " + distance);

        // Fetch pricing based on weight
        VendorWeightPricing weightPricing = vendorWeightPricingDao.findCostByVendorAndWeight(requestDTO.getVendorId(), requestDTO.getShipmentWeight())
                .orElseThrow(() -> new RuntimeException("No pricing found for weight range: " + requestDTO.getShipmentWeight()));

        Double costPerKm = weightPricing.getPricePerKm();
        System.out.println("Cost per KM: " + costPerKm);

        // Calculate total cost
        BigDecimal costPerKmBigDecimal = BigDecimal.valueOf(costPerKm);
        BigDecimal distanceDecimal = BigDecimal.valueOf(distance);
        BigDecimal totalPrice = distanceDecimal.multiply(costPerKmBigDecimal);

        // Additional services cost calculation using a for loop
        List<Requirement> requirements = new ArrayList<>();

        for (Long serviceId : requestDTO.getRequirementIds()) {
            Services service = servicesDao.findById(serviceId)
                    .orElseThrow(() -> new RuntimeException("Service not found with ID: " + serviceId));

            Long addPrice = vendorServiceDao.findPriceByServiceIdAndVendorId(serviceId, requestDTO.getVendorId());
            System.out.println("Price for Service ID " + serviceId + ": " + addPrice);

            if (addPrice != null) {
                totalPrice = totalPrice.add(BigDecimal.valueOf(addPrice)); // Correctly update totalPrice
            }

            Requirement requirement = new Requirement();
            requirement.setService(service);
            requirements.add(requirement);
        }

        System.out.println("Final Total Price: " + totalPrice);

        // Save ServiceRequest
        ServiceRequest serviceRequest = new ServiceRequest();
        serviceRequest.setUser(user);
        serviceRequest.setVendor(vendor);
        serviceRequest.setShiftingType(shiftingType);
        serviceRequest.setPickupLocation(requestDTO.getPickupLocation());
        serviceRequest.setDropoffLocation(requestDTO.getDropoffLocation());
        serviceRequest.setRequestStatus(RequestStatus.PENDING);
        serviceRequest.setPaymentStatus(PaymentStatus.PENDING);
        serviceRequest.setShipmentWeight(requestDTO.getShipmentWeight());
        serviceRequest.setTotalPrice(totalPrice);
        serviceRequest.setIsDeleted(false);
        LocalDate localDate = requestDTO.getPreferredDate().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
                serviceRequest.setPreferredDate(localDate);

        serviceRequest = serviceRequestDao.save(serviceRequest);

        // Save Requirements linked to ServiceRequest
        for (Requirement requirement : requirements) {
            requirement.setServiceRequest(serviceRequest);
            requirementDao.save(requirement);
        }

        return new ApiResponse("The total price of the service will be: " + totalPrice);
    }
    
    @Override
    public List<ServiceRequestResDTO> getServiceRequestByVendor(Long vid) {
        List<ServiceRequest> serviceRequests = serviceRequestDao.findAllByVendorId(vid);
        
        return serviceRequests.stream().map(serviceRequest -> {
        	String shifting = serviceRequest.getShiftingType().getShiftingTypeName();

            
            String userName = serviceRequest.getUser().getFullName(); 
            String email = serviceRequest.getUser().getEmail(); 
            List<String> serviceNames = requirementDao.findAllByServiceRequestId(serviceRequest.getId()).stream()
            	    .map(requirement -> requirement.getService().getServiceName())  // ✅ Fetch service name directly
            	    .collect(Collectors.toList());


 
            
            return new ServiceRequestResDTO(
                serviceRequest.getId(),                   
                userName,                                
                email,                                   
                serviceRequest.getVendor().getId(),      
                shifting,                                
                serviceRequest.getShipmentWeight(),      
                serviceRequest.getPickupLocation(),      
                serviceRequest.getDropoffLocation(),     
                Date.valueOf(serviceRequest.getPreferredDate()),
                serviceRequest.getRequestStatus(),       
                serviceRequest.getPaymentStatus(),       
                serviceRequest.getIsDeleted(),       
                serviceNames
            );
        }).collect(Collectors.toList());
    }
    
    @Override
    public String updateRequestStatus(Long serviceRequestId, RequestStatus newStatus) {
        ServiceRequest serviceRequest = serviceRequestDao.findById(serviceRequestId)
                .orElseThrow(() -> new RuntimeException("ServiceRequest not found with ID: " + serviceRequestId));
        
        serviceRequest.updateRequestStatus(newStatus);
        
        serviceRequestDao.save(serviceRequest);
        
        return "ServiceRequest ID " + serviceRequestId + " status updated successfully to " + newStatus;
    }
    
    @Override
	public String cancelRequest(Long id) {
		 ServiceRequest serviceRequest = serviceRequestDao.findById(id)
	                .orElseThrow(() -> new RuntimeException("ServiceRequest not found with ID: " + id));
	        
	        serviceRequest.updateRequestStatus(RequestStatus.CANCELLED);
	        
	        serviceRequestDao.save(serviceRequest);
	        
	        return "ServiceRequest ID " + id + " status updated ca to CANCELLED";
	
	}
    
    @Override
	public List<ServiceRequestResUserDTO> getServiceRequestByUserId(Long userId) {
	    List<ServiceRequest> serviceRequests = serviceRequestDao.findAllByUserId(userId);

	    return serviceRequests.stream().map(serviceRequest -> {
	        String shifting = serviceRequest.getShiftingType().getShiftingTypeName();
	        String userName = serviceRequest.getUser().getFullName(); 
	        String email = serviceRequest.getUser().getEmail(); 

	        String vendorName = serviceRequest.getVendor().getBussinessName(); // Assuming getVendorName() exists in Vendor

	        List<String> serviceNames = requirementDao.findAllByServiceRequestId(serviceRequest.getId()).stream()
	            .map(requirement -> requirement.getService().getServiceName()) 
	            .collect(Collectors.toList());

	        return new ServiceRequestResUserDTO(
	        	    serviceRequest.getId(),                   
	        	    userName,                                
	        	    email,                                   
	        	    vendorName,                              
	        	    shifting,                                
	        	    serviceRequest.getShipmentWeight(),      
	        	    serviceRequest.getPickupLocation(),      
	        	    serviceRequest.getDropoffLocation(),     
	        	    Date.valueOf(serviceRequest.getPreferredDate()),
	        	    serviceRequest.getRequestStatus(),       
	        	    serviceRequest.getPaymentStatus(),       
	        	    serviceRequest.getIsDeleted(),       
	        	    serviceNames
	        	);

	    }).collect(Collectors.toList());
	}
}