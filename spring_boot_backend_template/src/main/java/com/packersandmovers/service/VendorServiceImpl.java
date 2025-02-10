package com.packersandmovers.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.packersandmovers.custom_exception.ApiException;
import com.packersandmovers.dao.VendorDao;
import com.packersandmovers.dto.ApiResponse;
import com.packersandmovers.dto.AuthRequest;
import com.packersandmovers.dto.VendorReqDTO;
import com.packersandmovers.dto.VendorResDTO;
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
	
	@Override
	public List<VendorResDTO> getAllVendors() {
		 return vendorDao.findAll().stream().map((v)-> modelMapper.map(v,VendorResDTO.class)).toList();

	}
	
	@Override
	public VendorResDTO signIn(AuthRequest dto) {
         Vendor VendorEntity = vendorDao.findByEmailAndPassword(dto.getEmail(), dto.getPassword()).orElseThrow(() ->new ApiException("Invalid Email or password !!!!!"));
		 return modelMapper.map(VendorEntity, VendorResDTO.class);
	}

}
