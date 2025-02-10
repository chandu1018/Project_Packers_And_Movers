package com.packersandmovers.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.packersandmovers.custom_exception.ApiException;
import com.packersandmovers.dao.UserDao;
import com.packersandmovers.dto.ApiResponse;
import com.packersandmovers.dto.AuthRequest;
import com.packersandmovers.dto.UserReqDTO;
import com.packersandmovers.dto.UserRespDTO;
import com.packersandmovers.pojos.User;
import com.packersandmovers.pojos.UserRole;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserDao userdao;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public String signUp(UserReqDTO dto) 
	{
		User UserEntity=modelMapper.map(dto, User.class);
		User persistentUser = userdao.save(UserEntity);
		persistentUser.setRole(UserRole.CUSTOMER);
		persistentUser.setDeleteStatus(false);
		
		return "Added new category with ID="+ persistentUser.getId();
	}

	@Override
	public UserRespDTO signIn(AuthRequest dto) 
	{
		User userEntity = userdao.findByEmailAndPassword(dto.getEmail(), dto.getPassword()).orElseThrow(() ->new ApiException("Invalid Email or password !!!!!"));
		
		return modelMapper.map(userEntity, UserRespDTO.class);
	}

}
