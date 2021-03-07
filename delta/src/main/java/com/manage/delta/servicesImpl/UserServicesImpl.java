package com.manage.delta.servicesImpl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manage.delta.model.UserSO;
import com.manage.delta.role.UserRole;
import com.manage.delta.services.UserServices;

@Service
public class UserServicesImpl implements UserServices {
	
	@Autowired
	private UserRole userRole;

	@Override
	@Transactional
	public UserSO saveUser(UserSO userSO) {
		return userRole.saveUser(userSO);
	}
	
	@Override
	@Transactional
	public UserSO isUserValid(UserSO userSO) {
		return userRole.isUserValid(userSO);
	}
}
