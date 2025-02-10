package com.packersandmovers.pojos;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users") // to specify name of the table
@NoArgsConstructor
@Getter
@Setter
public class User extends BaseEntity 
{ 
	@Column(name = "full_name", length = 100) 
	private String fullName;
	
	@Column(length = 50, unique = true) // adds unique constraint
	private String email;
	
	@Column(length = 20, nullable = false) // not null constraint
	private String password;
	
	@Column(length = 15, nullable = false) // not null constraint
	private String phone;
	
	@Column(length = 100, nullable = false) // not null constraint
	private String address;
	
	@Column(length = 80, nullable = false) // not null constraint
	private String city;
	
	@Enumerated(EnumType.STRING) 
	@Column(length = 30) 
	private UserRole role;
	
	@Column(name="delete_status")
	boolean deleteStatus;
}


