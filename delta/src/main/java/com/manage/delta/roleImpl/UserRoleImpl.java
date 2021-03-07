package com.manage.delta.roleImpl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.manage.delta.entity.User;
import com.manage.delta.model.UserSO;
import com.manage.delta.repo.UserRepo;
import com.manage.delta.role.UserRole;

@Component
public class UserRoleImpl implements UserRole {
	
	@Autowired
	private UserRepo userRepo;

	@Override
	public UserSO saveUser(UserSO userSO) {

		User user = new User();

		BeanUtils.copyProperties(userSO, user);

	//	user.setPassword(getPassword(user.getPassword()));

		user = userRepo.save(user);
		
		userSO.setUserId(user.getUserId());

		return userSO;
	}

	@Override
	public UserSO isUserValid(UserSO userSO) {
		return null;
	}
//
//	private String getPassword(String password) {
//		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12); // Strength set as 12
//		return encoder.encode(password);
//	}
}
