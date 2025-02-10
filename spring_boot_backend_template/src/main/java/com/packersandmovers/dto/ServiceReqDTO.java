package com.packersandmovers.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class ServiceReqDTO 
{
	private String serviceName;
	
	private String description;
}
