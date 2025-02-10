package com.packersandmovers.dto;
import com.packersandmovers.pojos.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserReqDTO 
{
	
	private String fullName;
	
	
	private String email;
	

	private String password;
	
	
	private String phone;
	

	private String address;
	

	private String city;
	
	

}
