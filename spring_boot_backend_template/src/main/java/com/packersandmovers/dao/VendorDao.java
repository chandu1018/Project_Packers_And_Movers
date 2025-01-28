package com.packersandmovers.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.packersandmovers.pojos.Vendor;

public interface VendorDao extends JpaRepository<Vendor, Long>
{
	

}
