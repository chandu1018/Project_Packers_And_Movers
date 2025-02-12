package com.packersandmovers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.packersandmovers.dto.ApiResponse;
import com.packersandmovers.dto.AuthRequest;
import com.packersandmovers.dto.UserReqDTO;
import com.packersandmovers.service.UserService;



@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")

public class UserContoller 
{
	@Autowired
	UserService userService;
	 
		@PostMapping("/signup")
		public String userSignIn(@RequestBody UserReqDTO user)
		{
			return userService.signUp(user);
		}
		
		@PostMapping("/signin")
		public ResponseEntity<?> userSignIn(@RequestBody AuthRequest dto)
		{
			System.out.println("in user sign in "+dto);
			try {
				return ResponseEntity.ok(userService.signIn(dto));
			} catch (RuntimeException e) {
				//SC 401 , err mesg
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
						.body(new ApiResponse(e.getMessage()));
			}
		}
}
