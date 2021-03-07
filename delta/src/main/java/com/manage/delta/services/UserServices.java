package com.manage.delta.services;

import com.manage.delta.model.UserSO;

public interface UserServices {

	UserSO saveUser(UserSO userSO);

	UserSO isUserValid(UserSO userSO);
	

}
