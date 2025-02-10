package com.packersandmovers.pojos;

import java.util.ArrayList;
import java.util.List;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "VendorServices")
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude="vendorList,serviceList")

public class VendorServices extends BaseEntity 
{
	@ManyToOne
	@JoinColumn(name="vendor_id" ,nullable=false)
	private Vendor vendor;
	
	@ManyToOne
	@JoinColumn(name="service_id",nullable=false)
	private Services services;

	@Column(name="Price" , nullable=false)
	private Long price;
	

}
