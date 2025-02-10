package com.packersandmovers.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.packersandmovers.dao.ServicesDao;
import com.packersandmovers.dao.VendorDao;
import com.packersandmovers.dao.VendorServiceDao;
import com.packersandmovers.dto.ApiResponse;
import com.packersandmovers.dto.VendorReqDTO;
import com.packersandmovers.dto.VendorsServiceDTO;
import com.packersandmovers.dto.VendorsServiceResDTO;
import com.packersandmovers.pojos.Services;
import com.packersandmovers.pojos.UserRole;
import com.packersandmovers.pojos.Vendor;
import com.packersandmovers.pojos.VendorServices;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@NoArgsConstructor

@Service
@Transactional
public class VendorServicesServiceImpl implements VendorServicesService 
{
	@Autowired
	private VendorServiceDao vendorServiceDao;
	
	@Autowired
	private VendorDao vendorDao;
	
	@Autowired
	private ServicesDao serviceDao;
	
	@Autowired
	private ModelMapper modelMapper;
	

	@Override
	public ApiResponse addVendorService(VendorsServiceDTO vendorServiceDto) 
	{
		Vendor vendor = vendorDao.findById(vendorServiceDto.getVendorid()).orElseThrow(() -> new RuntimeException("Vendor not found with ID: " +vendorServiceDto.getVendorid()));
		Services service = serviceDao.findById(vendorServiceDto.getServicesid()).orElseThrow(() -> new RuntimeException("Vendor not found with ID: " +vendorServiceDto.getServicesid()));
		
		
		
		VendorServices vendorServiceEnity = new VendorServices();
		vendorServiceEnity.setServices(service);
		vendorServiceEnity.setVendor(vendor);
		vendorServiceEnity.setPrice(vendorServiceDto.getPrice());
		
		vendorServiceDao.save(vendorServiceEnity);
		
		return new ApiResponse("Added vendorService successfully !!!");
		
	 }


	@Override
	public List<VendorsServiceDTO> getAllServices() {
	    return vendorServiceDao.findAll().stream().map(vendorService -> {
	        VendorsServiceDTO dto = new VendorsServiceDTO();
	        dto.setVendorid(vendorService.getVendor().getId()); 
	        dto.setServicesid(vendorService.getServices().getId()); 
	        dto.setPrice(vendorService.getPrice()); 
	        return dto;
	    }).toList();
	}
	
	@Override
	public List<VendorsServiceResDTO> getAllServicesByVendorID(Long id) {
	    List<VendorServices> services = vendorServiceDao.findByVendorIdWithServices(id);

	    return services.stream().map(service -> {
	        VendorsServiceResDTO dto = new VendorsServiceResDTO();
	        dto.setVendorid(service.getVendor().getId()); 
	        dto.setServicesName(service.getServices().getServiceName()); 
	        dto.setPrice(service.getPrice()); 
	        return dto;
	    }).collect(Collectors.toList());
	}

	@Override
    public ApiResponse updatePrice(VendorsServiceResDTO dto) {
        Services service = serviceDao.findByServiceName(dto.getServicesName())
                .orElseThrow(() -> new RuntimeException("Service not found!"));

        VendorServices vendorService = vendorServiceDao.findByVendorIdAndServicesId(dto.getVendorid(), service.getId()).orElseThrow(() -> new RuntimeException("Vendor Service not found!"));

        vendorService.setPrice(dto.getPrice());

        vendorServiceDao.save(vendorService);

        return new ApiResponse("Price updated successfully for vendor ID: " + dto.getVendorid() +
                               " and service name: " + dto.getServicesName());
    }
 

    @Override
    public ApiResponse deleteVendorService(VendorsServiceResDTO dto) {
        Services service = serviceDao.findByServiceName(dto.getServicesName())
                .orElseThrow(() -> new RuntimeException("Service not found!"));

        VendorServices vendorService = vendorServiceDao.findByVendorIdAndServicesId(dto.getVendorid(), service.getId())
                .orElseThrow(() -> new RuntimeException("Vendor Service not found!"));

        vendorServiceDao.delete(vendorService);

        return new ApiResponse("Vendor service deleted successfully for vendor ID: " + dto.getVendorid() +
                               " and service name: " + dto.getServicesName());
    }

	


}