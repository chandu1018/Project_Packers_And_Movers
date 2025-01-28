package com.packersandmovers.dto;


import java.time.LocalDate;

import com.packersandmovers.pojos.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRespDTO extends BaseDTO 
{
	private String fullName;
	
	private String email;
	
	private String password;
	
	private String phone;
	
	private String address;
	
	private String city;
	
	private UserRole role;
	
	boolean deleteStatus;

}
