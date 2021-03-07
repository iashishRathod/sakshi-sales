package com.manage.delta.role;

import com.manage.delta.model.UserSO;

public interface UserRole {
	
	UserSO saveUser(UserSO userSO);

	UserSO isUserValid(UserSO userSO);

}
