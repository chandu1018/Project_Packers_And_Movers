package com.packersandmovers.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.packersandmovers.dao.VendorDao;
import com.packersandmovers.dto.ApiResponse;
import com.packersandmovers.dto.VendorReqDTO;
import com.packersandmovers.pojos.UserRole;
import com.packersandmovers.pojos.Vendor;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class VendorServiceImpl implements VendorService 
{
	@Autowired
	private VendorDao vendorDao;
	
	@Autowired
	private ModelMapper modelMapper;
	

	@Override
	public ApiResponse signIn(VendorReqDTO dto) 
	{
		Vendor vendorEntity = modelMapper.map(dto, Vendor.class);
		vendorEntity.setUserRole(UserRole.VENDOR);
		Vendor vendorPersistency = vendorDao.save(vendorEntity);
		
		return new ApiResponse("Added new Vendor with vendor Id :"+vendorPersistency.getId());
	}

}
