package com.packersandmovers.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.packersandmovers.dto.UserReqDTO;
import com.packersandmovers.pojos.User;

public interface UserDao extends JpaRepository<User, Long> {

	Optional<User> findByEmailAndPassword(String em, String pass);
	
}
