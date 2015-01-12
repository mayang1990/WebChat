package com.controller;

import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.beans.factory.annotation.Autowired;
import com.dao.UserDao;
@RemoteProxy(name="DWRValidator")
public class DWRValidator {
	@Autowired
	private UserDao userdao;
	@RemoteMethod
	public String validateUSER_ID(String USER_ID){
		return "可用";		
	}
}
