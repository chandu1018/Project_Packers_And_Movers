package com.packersandmovers.service;


import com.packersandmovers.dto.AuthRequest;
import com.packersandmovers.dto.UserReqDTO;
import com.packersandmovers.dto.UserRespDTO;

public interface UserService {

	 String signUp(UserReqDTO dto);

	 UserRespDTO signIn(AuthRequest dto);
}
