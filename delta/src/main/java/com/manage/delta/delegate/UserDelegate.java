package com.manage.delta.delegate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.manage.delta.model.UserSO;
import com.manage.delta.services.UserServices;

@Component
public class UserDelegate {
	
	@Autowired
	private UserServices userServices;

	public UserSO saveUser(UserSO userSO) {
		return userServices.saveUser(userSO);
	}

}
