package com.packersandmovers.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.packersandmovers.dao.ServicesDao;
import com.packersandmovers.dto.ApiResponse;
import com.packersandmovers.dto.ServiceReqDTO;
import com.packersandmovers.dto.ServiceResDTO;
import com.packersandmovers.pojos.Services;
import com.packersandmovers.pojos.User;
import com.packersandmovers.pojos.UserRole;
import com.packersandmovers.pojos.Vendor;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ServicesServiceImpl implements ServicesService {

	@Autowired
	ServicesDao servicesDao;
	
	@Autowired
	ModelMapper modelMapper;
	
	
	@Override
	public ApiResponse addService(ServiceReqDTO serviceReqDTO) 
	{
		Services serviceEntity = modelMapper.map(serviceReqDTO, Services.class);
		Services vendorPersistency = servicesDao.save(serviceEntity);
		
		return new ApiResponse("Added new Vendor with vendor Id :"+vendorPersistency.getId());
	}


	@Override
	public List<ServiceResDTO> getAllServices() {
		return servicesDao.findAll().stream().map(serv->(modelMapper.map(serv, ServiceResDTO.class))).collect(Collectors.toList());	}


	
}
