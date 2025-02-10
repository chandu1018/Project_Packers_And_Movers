package com.packersandmovers.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.packersandmovers.pojos.Services;

public interface ServicesDao extends JpaRepository<Services, Long> {
	 Optional<Services> findByServiceName(String serviceName);

}
