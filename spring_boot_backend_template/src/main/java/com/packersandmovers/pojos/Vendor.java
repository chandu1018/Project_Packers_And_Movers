package com.packersandmovers.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vendors")
@NoArgsConstructor
@Getter
@Setter
public class Vendor extends BaseEntity
{
	@Column(length = 100,nullable = false)
	private String ownerName;
	
	@Column(length = 200,nullable = false)
	private String bussinessName;
	
	@Column(length = 25, unique = true) 
	private String email;
	
	@Column(length = 20, nullable = false) // not null constraint
	private String password;
	
	@Column(length = 15 , nullable = false)
	private String mobileNo;
	
	@Column(length = 100)
	private String address;
	
	@Column(length = 30)
	private float rating;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 30)
	private UserRole userRole;
	
//	@Lob
//	private byte[] image;
//	
	@Column(length = 50, nullable=false)
	private int cin;
	
	@Column(name="deleted_status")
	private boolean deleteStatus;
	
	
	

}
