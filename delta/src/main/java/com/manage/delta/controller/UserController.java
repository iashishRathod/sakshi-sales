package com.manage.delta.controller;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.manage.delta.delegate.UserDelegate;
import com.manage.delta.model.UserSO;

@RestController
public class UserController {

//	@Autowired
//	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDelegate userDelegate;
	
//	@Autowired
//	private MyUserDetailsService userDetailsService;
//	
//	@Autowired
//	private JwtUtil jwtUtil;

	@PostMapping(value= "/users/saveUser")
	public @ResponseBody UserSO saveUser(@RequestBody UserSO userSO) throws ValidationException  {
		return userDelegate.saveUser(userSO);
	}

//	@RequestMapping(value= "/authenticate",produces = "application/json",method= RequestMethod.POST)
//	public ResponseEntity<?> logInUser(@RequestBody UserSO userSO) throws Exception  {	
//		try {
//			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userSO.getUserName(), userSO.getPassword()));
//		} catch (Exception e) {
//			throw new Exception("Incorrect Username or password");
//		}
//		
//		final String token = jwtUtil.genrateToken(userDetailsService.loadUserByUsername(userSO.getUserName()));
//		
//		return ResponseEntity.ok(new AuthenticationResponse(token));
//	}
}
